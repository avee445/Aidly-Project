const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { poolPromise } = require('./db');

const app = express();
const saltRounds = 10;

// --- Middleware ---
app.use(express.json()); 
app.use(cors());        

app.get('/', (req, res) => {
    res.send('Aidly Backend API is running! 🚀');
});

// --- Authentication Routes ---
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('email', email)
            .query('SELECT * FROM Users WHERE Email = @email');

        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            const isMatch = await bcrypt.compare(password, user.PasswordHash);
            if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

            res.json({ 
                message: "Login successful!", 
                user: { fullName: user.FullName, role: user.UserRole, phone: user.Phone || '', address: user.Address || '' } 
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (err) { res.status(500).send("Database error: " + err.message); }
});

app.post('/api/register', async (req, res) => {
    const { fullName, email, password, role, phone, address } = req.body;
    try {
        const pool = await poolPromise;
        const hashedSecurePassword = await bcrypt.hash(password, saltRounds);

        // Everyone defaults to Pending so the Admin can approve them
        await pool.request()
            .input('name', fullName)
            .input('email', email)
            .input('pass', hashedSecurePassword)
            .input('role', role)
            .input('phone', phone || '')
            .input('addr', address || '')
            .query(`
                INSERT INTO Users (FullName, Email, PasswordHash, UserRole, Phone, Address, Status) 
                VALUES (@name, @email, @pass, @role, @phone, @addr, 'Pending')
            `);
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) { res.status(500).send("Error: " + err.message); }
});

// --- Help Request Routes ---
app.post('/api/requests', async (req, res) => {
    const { seniorName, phone, address, taskDescription, urgency, sideNotes } = req.body;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('name', seniorName)
            .input('phone', phone)
            .input('addr', address)
            .input('task', taskDescription)
            .input('urgency', urgency)
            .input('notes', sideNotes || '')
            .query(`
                INSERT INTO HelpRequests (SeniorName, PhoneNumber, Address, TaskDescription, Urgency, Status, SideNotes) 
                VALUES (@name, @phone, @addr, @task, @urgency, 'Waiting', @notes)
            `);
        res.status(201).json({ message: "Saved to SQL!" });
    } catch (err) { res.status(500).send("Database Error: " + err.message); }
});

app.get('/api/requests', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM HelpRequests ORDER BY CreatedAt DESC');
        res.json(result.recordset);
    } catch (err) { res.status(500).send("Error: " + err.message); }
});

app.put('/api/requests/:id/assign', async (req, res) => {
    const { volunteerName } = req.body;
    const { id } = req.params;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('volName', volunteerName)
            .input('reqId', id)
            .query("UPDATE HelpRequests SET Status = 'Assigned', AssignedVolunteer = @volName WHERE RequestID = @reqId");
        res.json({ message: "Volunteer assigned!" });
    } catch (err) { res.status(500).send(err.message); }
});

app.put('/api/requests/:id/complete', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('reqId', id)
            .query("UPDATE HelpRequests SET Status = 'Completed' WHERE RequestID = @reqId");
        res.json({ message: "Task completed!" });
    } catch (err) { res.status(500).send(err.message); }
});

// --- Universal User Approval System ---
app.get('/api/users/pending', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT 
                UserID AS userId, 
                FullName AS fullName, 
                Email AS email, 
                UserRole AS userRole 
            FROM Users 
            WHERE Status = 'Pending'
        `);
        res.json(result.recordset);
    } catch (err) { res.status(500).send(err.message); }
});

app.put('/api/users/:id/:action', async (req, res) => {
    const { id, action } = req.params;
    const newStatus = action === 'approve' ? 'Active' : 'Rejected';
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('id', id)
            .query(`UPDATE Users SET Status = '${newStatus}' WHERE UserID = @id`);
        res.json({ message: `User ${newStatus} successfully!` });
    } catch (err) { res.status(500).send(err.message); }
});

// --- Get ALL Active Users (Seniors & Volunteers) ---
app.get('/api/users/active', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT 
                UserID AS userId, 
                FullName AS fullName, 
                Email AS email, 
                Phone AS phone, 
                Address AS address, 
                UserRole AS userRole 
            FROM Users 
            WHERE Status = 'Active'
        `);
        res.json(result.recordset);
    } catch (err) { res.status(500).send(err.message); }
});

// --- Update ANY User's Info ---
app.put('/api/users/:id/update', async (req, res) => {
    const { fullName, email, phone, address } = req.body; 
    const { id } = req.params;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('id', id)
            .input('name', fullName)
            .input('email', email)
            .input('phone', phone || '')
            .input('addr', address || '')
            .query(`UPDATE Users SET FullName = @name, Email = @email, Phone = @phone, Address = @addr WHERE UserID = @id`);
        res.json({ message: "User Info Updated Successfully!" });
    } catch (err) { res.status(500).send("Database error: " + err.message); }
});

// --- UPDATED STATS ROUTE ---
app.get('/api/stats', async (req, res) => {
    try {
        const pool = await poolPromise;
        const waiting = await pool.request().query("SELECT COUNT(*) as count FROM HelpRequests WHERE Status = 'Waiting'");
        const assigned = await pool.request().query("SELECT COUNT(*) as count FROM HelpRequests WHERE Status = 'Assigned'");
        const completed = await pool.request().query("SELECT COUNT(*) as count FROM HelpRequests WHERE Status = 'Completed'");
        const volunteers = await pool.request().query("SELECT COUNT(*) as count FROM Users WHERE UserRole = 'Volunteer'");
        
        res.json({
            pending: waiting.recordset[0].count,
            ongoing: assigned.recordset[0].count,
            completed: completed.recordset[0].count,
            volunteers: volunteers.recordset[0].count
        });
    } catch (err) { res.status(500).send(err.message); }
});

app.get('/api/admin-stats', async (req, res) => {
    try {
        const pool = await poolPromise;
        const chartData = await pool.request().query(`
            SELECT TOP 5 CAST(CreatedAt AS DATE) as Date, COUNT(*) as Count 
            FROM HelpRequests GROUP BY CAST(CreatedAt AS DATE) ORDER BY Date DESC
        `);
        res.json({ chartValues: chartData.recordset.map(row => row.Count).reverse() });
    } catch (err) { res.status(500).send(err.message); }
});

// --- Feedback Routes ---
app.get('/api/feedback', async (req, res) => {
    console.log('GET /api/feedback hit');
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT 
                FeedbackID AS feedbackId, 
                RequestID AS requestId, 
                VolunteerName AS volunteerName, 
                Rating AS rating, 
                Comments AS comments, 
                CreatorRole AS creatorRole
            FROM Feedback
            ORDER BY FeedbackID DESC
        `);
        res.json(result.recordset);
    } catch (err) { res.status(500).send(err.message); }
});

app.post('/api/feedback', async (req, res) => {
    console.log('POST /api/feedback hit');
    const { requestId, reviewerName, rating, comments, role } = req.body;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('reqId', requestId)
            .input('reviewerName', reviewerName)
            .input('rating', rating)
            .input('comments', comments || '')
            .input('role', role)
            .query(`INSERT INTO Feedback (RequestID, VolunteerName, Rating, Comments, CreatorRole) VALUES (@reqId, @reviewerName, @rating, @comments, @role)`);
        await pool.request()
            .input('reqId', requestId)
            .query(`UPDATE HelpRequests SET IsRated = 1 WHERE RequestID = @reqId`);    
        res.status(201).json({ message: "Feedback saved!" });
    } catch (err) { res.status(500).send(err.message); }
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`🚀 Aidly Server is running on http://localhost:${PORT}`);
});
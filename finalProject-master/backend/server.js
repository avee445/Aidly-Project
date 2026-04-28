const express = require('express');
const cors = require('cors');
const { poolPromise } = require('./db');

const app = express();

// --- 1. Middleware ---
app.use(express.json()); 
app.use(cors());         

// --- 2. Home Route ---
app.get('/', (req, res) => {
    res.send('Aidly Backend API is running! 🚀');
});

// --- 3. Authentication Routes ---

// Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('email', email)
            .input('pass', password)
            .query('SELECT * FROM Users WHERE Email = @email AND PasswordHash = @pass');

        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            res.json({ 
                message: "Login successful!", 
                user: { 
                    fullName: user.FullName, 
                    role: user.UserRole,
                    phone: user.Phone || '', // Added in case you have these in Users table
                    address: user.Address || '' 
                } 
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (err) {
        res.status(500).send("Database error: " + err.message);
    }
});

// Register
app.post('/api/register', async (req, res) => {
    const { fullName, email, password, role } = req.body;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('name', fullName)
            .input('email', email)
            .input('pass', password)
            .input('role', role)
            .query('INSERT INTO Users (FullName, Email, PasswordHash, UserRole) VALUES (@name, @email, @pass, @role)');
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});

// --- 4. Help Request Routes ---

// Create Request (With ALL restored inputs)
app.post('/api/requests', async (req, res) => {
    // 1. Destructure the data coming from React
    const { seniorName, phone, address, taskDescription, urgency } = req.body;
    
    // Log it so you can see if the data actually arrived at the server!
    console.log("New Request Received:", req.body);

    try {
        const pool = await poolPromise;
        await pool.request()
            .input('name', seniorName)
            .input('phone', phone)
            .input('addr', address)
            .input('task', taskDescription)
            .input('urgency', urgency)
            // 2. Ensure these column names match your SQL Table EXACTLY
            .query(`
                INSERT INTO HelpRequests (SeniorName, PhoneNumber, Address, TaskDescription, Urgency, Status) 
                VALUES (@name, @phone, @addr, @task, @urgency, 'Waiting')
            `);
        
        res.status(201).json({ message: "Saved to SQL! 🚀" });
    } catch (err) {
        console.error("SQL INSERT ERROR:", err.message);
        res.status(500).send("Database Error: " + err.message);
    }
});

// 1. Get Pending Volunteers
app.get('/api/volunteers/pending', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query("SELECT UserID, FullName, Email FROM Users WHERE UserRole = 'Volunteer' AND Status = 'Pending'");
        res.json(result.recordset);
    } catch (err) { res.status(500).send(err.message); }
});

// 2. Approve/Reject Logic
// --- Update ALL Volunteer Details ---
app.put('/api/volunteers/:id/update', async (req, res) => {
    const { fullName, email, phone, address } = req.body; // Lowercase keys from React
    const { id } = req.params;

    console.log("Data received at backend:", req.body); // Check your terminal!

    try {
        const pool = await poolPromise;
        await pool.request()
            .input('id', id)
            .input('name', fullName)
            .input('email', email)
            .input('phone', phone || '')
            .input('addr', address || '')
            .query(`
                UPDATE Users 
                SET FullName = @name, 
                    Email = @email, 
                    Phone = @phone, 
                    Address = @addr 
                WHERE UserID = @id
            `);
        res.json({ message: "Update Success!" });
    } catch (err) {
        console.error("SQL Error:", err.message);
        res.status(500).send("Database error: " + err.message);
    }
});
// Get All Requests
app.get('/api/requests', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM HelpRequests ORDER BY CreatedAt DESC');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});

// Assign a Volunteer (Update Status to Assigned)
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
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Mark Task as Completed
app.put('/api/requests/:id/complete', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('reqId', id)
            .query("UPDATE HelpRequests SET Status = 'Completed' WHERE RequestID = @reqId");
        res.json({ message: "Task completed!" });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// --- 5. User/Volunteer Management ---

// Get Only Volunteers for dropdowns
// --- Get ALL Details for Volunteers ---
app.get('/api/volunteers', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query("SELECT UserID, FullName, Email, Phone, Address FROM Users WHERE UserRole = 'Volunteer' AND Status = 'Active'");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
// --- 6. Statistics & Dashboard Routes ---

// Basic Counts (Waiting Seniors / Total Volunteers)
app.get('/api/stats', async (req, res) => {
    try {
        const pool = await poolPromise;
        const seniors = await pool.request().query("SELECT COUNT(*) as count FROM HelpRequests WHERE Status = 'Waiting'");
        const volunteers = await pool.request().query("SELECT COUNT(*) as count FROM Users WHERE UserRole = 'Volunteer'");
        res.json({
            seniorsWaiting: seniors.recordset[0].count,
            newVolunteers: volunteers.recordset[0].count
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// --- Approve or Reject Volunteer ---
app.put('/api/volunteers/:id/:action', async (req, res) => {
    const { id, action } = req.params;
    
    // Logic: If action is 'approve' -> Active. Otherwise -> Rejected.
    const newStatus = action === 'approve' ? 'Active' : 'Rejected';

    console.log(`Processing ${action} for UserID: ${id}`); // Look at your terminal!

    try {
        const pool = await poolPromise;
        await pool.request()
            .input('id', id)
            .query(`UPDATE Users SET Status = '${newStatus}' WHERE UserID = @id`);
        
        res.json({ message: `Volunteer ${newStatus} successfully!` });
    } catch (err) {
        console.error("SQL Error:", err.message);
        res.status(500).send(err.message);
    }
});

// Advanced Admin Stats (Success Rate & Chart)
app.get('/api/admin-stats', async (req, res) => {
    try {
        const pool = await poolPromise;
        const totalReq = await pool.request().query("SELECT COUNT(*) as total FROM HelpRequests");
        const compReq = await pool.request().query("SELECT COUNT(*) as comp FROM HelpRequests WHERE Status = 'Completed'");
        
        const total = totalReq.recordset[0].total || 1; 
        const completed = compReq.recordset[0].comp || 0;
        // Logic: Success Rate = (Completed / Total) * 100
        const successRate = Math.round((completed / total) * 100);

        const chartData = await pool.request().query(`
            SELECT TOP 5 CAST(CreatedAt AS DATE) as Date, COUNT(*) as Count 
            FROM HelpRequests 
            GROUP BY CAST(CreatedAt AS DATE) 
            ORDER BY Date DESC
        `);

        res.json({
            successRate: successRate + "%",
            chartValues: chartData.recordset.map(row => row.Count).reverse()
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// --- 7. Start the Server ---
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Aidly Server is running on http://localhost:${PORT}`);
    console.log(`📡 Waiting for SQL Server connection...`);
});
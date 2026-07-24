const sql = require('mssql');

const config = {
    user: 'db_acc6c0_aidly_admin', 
    password: 'Madrid123', 
    server: 'sql5063.site4now.net', 
    database: 'db_acc6c0_aidly',
    options: {
        encrypt: false, 
        trustServerCertificate: true 
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server (Cloud): AidlyDB ✅');
        return pool;
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = {
    sql, poolPromise
};
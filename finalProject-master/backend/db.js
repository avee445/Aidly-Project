import sql from 'mssql';

const dbConfig = {
    user: 'sa',
    password: 'Madrid123',
    server: '127.0.0.1', 
    // If you see \SQLEXPRESS in SSMS, use this line:
    instanceName: 'SQLEXPRESS', 
    database: 'AidlyDB',
    options: {
        encrypt: true,
        trustServerCertificate: true
    },
    // Sometimes removing the port helps when using instanceName
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('✅ Connected to SQL Server: AidlyDB');
        return pool;
    })
    .catch(err => {
        console.error('❌ Database Connection Failed: ', err);
    });

export {
    sql, poolPromise
};
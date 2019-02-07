require('dotenv').config();

module.exports = {
    database: process.env.DB_NAME || 'diplo',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'D08324cf',
    host: process.env.DB_HOST || '127.0.0.1',    
    port: process.env.DB_PORT || '3312',
    dialect: 'mysql',
}
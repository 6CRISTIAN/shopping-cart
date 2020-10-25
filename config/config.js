require('dotenv').config()

const config = {
    port: process.env.PORT || 3000
}

const connectDB = {
    host: process.env.DB_HOST,
    user: process.env.DB_USR,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA
}

module.exports = { config, connectDB }
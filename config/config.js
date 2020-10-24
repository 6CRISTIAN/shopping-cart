require('dotenv').config()

const config = {
    port: process.env.PORT || 3000,
    host: process.env.DB_HOST,
    user: process.env.DB_USR,
    pass: process.env.DB_PASS,
    db: process.env.DB_SCHEMA
}

module.exports = config
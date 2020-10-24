const mysql = require('mysql')

const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.pass,
    database: config.db
})

connection.connect((err) => {
    if (err) throw err
    console.log('Connected!')
})
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
    user: 'bsale_test',
    password: 'bsale_test',
    database: 'bsale_test'
})

connection.connect((err) => {
    if (err) throw err
    console.log('Connected!')
})
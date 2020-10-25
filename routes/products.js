const { connectDB } = require('../config/config')
const express = require('express')
const mysql = require('mysql')


module.exports = class Products {

    router = express.Router()
    DBConnection = null

    constructor(app) {
        app.use('/products', this.router)
        this.getProducts()
    }

    async getProducts() {
        this.router.get('/', function (req, res) {
            const connection = mysql.createConnection(connectDB)
            const filter = req.query.filter
            const query = filter
                ? { sql: `select * from bsale_test.product as p inner join bsale_test.category as c on p.category=c.id where p.name regexp '${filter}' or c.name regexp '${filter}'`, nestTables: true }
                : 'select * from bsale_test.product'
            setTimeout(_ => {
                connection.query(query, (error, results) => {
                    if (error) res.send(error)
                    else {
                        res.send(results)
                        connection.end()
                        console.log(query)
                    }
                })
            }, 0)
        })
    }
}

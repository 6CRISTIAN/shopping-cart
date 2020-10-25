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
                ? `SELECT p.id, p.name, p.url_image, p.price FROM bsale_test.product AS p INNER JOIN bsale_test.category as c ON p.category=c.id WHERE p.name regexp '${filter}' OR c.name regexp '${filter}';`
                : 'SELECT * FROM bsale_test.product'
            connection.query(query, function (error, results) {
                if (error) res.send(error)
                else {
                    res.send(results)
                    connection.end()
                }
            })
        })
    }
}

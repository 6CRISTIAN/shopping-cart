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
            connection.query('SELECT * FROM bsale_test.product', function (error, results) {
                if (error) res.send(error)
                else {
                    res.send(results)
                    console.log('··· retrieved')
                    connection.end()
                }
            })
        })
    }
}

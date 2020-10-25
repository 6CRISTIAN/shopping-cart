const { config } = require('./config/config')
const express = require('express')
const Products = require('./routes/products')

const app = express()

app.use(express.static('views'))
app.use('/*', express.static(__dirname + '/node_modules/'))
app.get("/", (req, res) => { res.sendFile(__dirname + '/views/index.html') })

new Products(app)

app.listen(config.port, '0.0.0.0', () => {
    console.log(`listening http://0.0.0.0:${config.port}`)
})

module.exports = app
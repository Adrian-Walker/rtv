const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()

app.use(express.json());
app.use(morgan('dev'));

async function db() {
    try {
        await mongoose.connect("mongodb://localhost:27017/rtv")
        console.log("db connected")
    } catch (error) {
        console.log(error)
    }
}
db()

app.listen(2000, () => {
    console.log('Running on port 2000');
})

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
require('dotenv').config()

const app = express()

app.use(express.json());
app.use(morgan('dev'));


// MongoDB
async function db() {
    try {
        await mongoose.connect("mongodb://localhost:27017/rtv",

            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        )
        console.log("db connected")
    } catch (error) {
        console.log(error)
    }
}
db()


// Middlewares
app.use('/auth', require('./routes/authRouter.js'))
app.use('/api/issue', require('./routes/issueRouter.js'))
app.use('/api/comment', require('./routes/commentRouter.js'))
app.use('/api', expressJWT({ secret: process.env.SECRET, algorithms: ['HS256'] })) // req.user


// Error Handler
app.use((err, req, res, next) => {
    console.log(err)
    if (err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    return res.send({ errMsg: err.message })
})


// Port
app.listen(2000, () => {
    console.log('Running on port 2000');
})

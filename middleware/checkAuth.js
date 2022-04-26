const jwt = require("jsonwebtoken")

function checkAuthToken(req, res, next) {
    const token = req.headers.authorization;
    if(!token) return res.status(400).send("No token provided")
    const bearerToken = token.split("Bearer ")[1]
    if(!bearerToken) return res.status(400).send("Token must be a Bearer Token")
    const decodedToken = jwt.verify(bearerToken, process.env.SECRET)
    req.user = decodedToken
    console.log(decodedToken)
    next()
}

module.exports = {checkAuthToken}


const jwt = require("jsonwebtoken")
const AdminCheck = (req, res, next) => {
    if (req.cookies && req.cookies.adminToken) {
        jwt.verify(req.cookies.adminToken, "anirban1234567890", (err, data) => {
            req.user = data
            next()
        })
    } else {
        next()
    }
}

module.exports = AdminCheck;
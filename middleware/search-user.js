require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

if (req.method === 'OPTIONS') {
    return next()
}


try {

    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        res.status(401).json({message: 'User not auth'})
    }

    const decoded = jwt.verify(token, process.env.JWTSECRET)

req.user = decoded
next()

}

catch(e) {

    res.status(401).json({message: 'User not auth'})

}





}
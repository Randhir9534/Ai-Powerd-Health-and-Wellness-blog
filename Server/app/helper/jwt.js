const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
    return jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET_KEY, {
        expiresIn: '7d'
    });
};
const jwt = require("jsonwebtoken");
const commonServices = require("../commonServices/common-services");

module.exports = async (req, res, next) => {
    try {
        let isHeader;
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : isHeader = false;
        if (isHeader == false) {
            return res.status(404).send('Authorization header is missing!');
        }

        if (!token) {
            return res.status(401).send('Authentication failed!')
        }

        const decodedToken = commonServices.verifyJWT(token);
        if (!decodedToken) {
            return res.status(401).json({ msg: 'Authentication failed!', isTokenExpire: true })
        }

        req.userData = { userId: decodedToken.userId, token: decodedToken };

        next()
    } catch (error) {
        return res.status(401).send('Error, Authentication failed!');
    }
}
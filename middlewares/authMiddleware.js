const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticate = async (req, res, next) => {

    try {
        
        const token  = req.cookies.jwtoken;
        const verifytoken = jwt.verify(token, 'karnik');

        const rootUser = await User.findOne({_id:verifytoken._id, "tokens.token":token});

        if(!rootUser){
            throw new Error('user not found')
        }

        req.token = token;
        req.rootUser = rootUser; 
        req.userId = rootUser._id;
        next();
    } catch (error) {
        res.status(401).send({message:"Un Authorized: token expire"})
    }
};

module.exports = authenticate;
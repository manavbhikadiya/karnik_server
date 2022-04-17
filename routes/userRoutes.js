const express = require('express');
const {createUser,loginUser,getUserData,logoutUser} = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');
const route = express.Router();

route.post('/createUser',createUser);
route.post('/loginUser/:email',loginUser);
route.get('/getUserData',authenticate,getUserData);
route.get('/logout',logoutUser);
module.exports = route;
//import express
const express = require('express');
//create router to append routes to
const router = express.Router();
//get handlers from controller
const {gaurd,login} = require('./../controllers/authenicationController');


//declare login route with using login handler from controller
//this is added before the gaurd route so this api doesn't request a token to work
router.post('/login', login);

//add gaurd handle to verify token sent in header
router.use(gaurd);
//anything route below this point request a token to function

module.exports.userRoutes = router


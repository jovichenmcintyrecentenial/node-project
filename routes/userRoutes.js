const express = require('express');
const router = express.Router();
const {gaurd,login} = require('./../controllers/authenicationController');


router.post('/login', login);

router.use(gaurd);

router.get('/user', (req, res, next) => {
    console.log('authenticated nice!!!')
    res.send()
});


module.exports.userRoutes = router


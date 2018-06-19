var express = require('express');
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt-nodejs')
var User = require('./models/user');
var router = express.Router();


router.post('/register', (req, res) => {
    var userData = req.body;
    var user = new User(userData);

    user.save((error, result) => {
        if (error) {
            console.log("error in saving data");
        }

        res.sendStatus(200);
    });

});


router.post('/login', async (req, res) => {
    var userData = req.body;
    var user = await User.findOne({email: userData.email});
    if (!user) {
        return res.status(401).send({message: "Email password is wrong"})
    }

    bcrypt.compare(userData.pwd, user.pwd, (err, isMatch) => {
        if (!isMatch) {
            return res.status(401).send({message: 'Email or Password invalid'})
        }
        var payload = {};
        var token = jwt.encode(payload, '123');
        res.status(200).send({token});
    });

});


module.exports = router;
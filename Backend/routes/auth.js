const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator');
const JWT_SECRET = 'Devashishisagoodbo$y'
const fetchuser = require('../middlewares/fetchuser')

//1.Creating a User-endpoint
router.post('/createuser', [
    body('name', "Enter a Valid Name").isLength({ min: 3 }),
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Minimu Length is 5").isLength({ min: 5 }),
], async (req, res) => {

    let success=false;
    // If there are errors,return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    try {
        // check wheter user exists or not
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({success,message:'user allready exist'})
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)
        // creat new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success=true;
        res.json({ success,authtoken })
    }
    catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }

})

//2. Authenticate a User-endpoint
router.post('/login', [
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Password cannot be empty").exists(),
], async (req, res) => {

    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        // check wheter user exists or not
        let user = await User.findOne({ email });

        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "Please try to Login with correct Credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please try to Login with correct Credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({ success, authtoken })
    }
    catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }

})

// 3.Get logged in user details 
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select('-password')
        res.send(user);
    }
    catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }

})

module.exports = router;
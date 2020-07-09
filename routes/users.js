// This should be POST /users/:user_id/ or POST /users/:user_id/token
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { check } = require("express-validator");

const { User, Server } = require('../db/models');
const { asyncHandler, handleValidationErrors } = require('../utils');
const { getUserToken, requireAuth } = require('../auth');

const validateEmailAndPassword = [
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please enter an email.')
        .isEmail()
        .withMessage('Please enter a valid email.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please give a password.'),
    handleValidationErrors
];

const validateUsername = [
    check("username")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a username."),
]


router.get('/servers/:server_id/users', asyncHandler(async (req, res, next) => {
    const serverId = parseInt(req.params.server_id, 10);
    const server = await Server.findByPk(serverId, { include: User });
    const users = server.Users;

    res.json({ users });
}));

router.post('/users', validateUsername, validateEmailAndPassword, asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ userName: username, userEmail: email, hashedPassword });
        const token = getUserToken(user);
        res.status(201).json({ token, user: { id: user.id, name: user.userName } });
    } catch (e) {
        console.log(e)
    }

}));


// // Change user information. Unfinished. What to do about changing only one thing at a time?
// router.put('/users', validateUsername, validateEmailAndPassword, asyncHandler(async (req, res, next) => {

//     // Gets form info. If any fields are not given, variable will be undefined
//     const { currentEmail, newUsername, newEmail, password, newPassword } = req.body;

//     // Find user from current email
//     const user = await User.findOne({ where: { userEmail: currentEmail } });

//     // Check for user and password match
//     if (!user || !user.validatePassword(password)) {
//         const err = new Error("Login failed");
//         err.status = 401;
//         err.title = "Login failed";
//         err.errors = ["The provided credentials were invalid."];
//         return next(err);
//     }

//     // Make new hashed password if newPassword is not undefined
//     if (newPassword) {
//         const newHashedPassword = await bcrypt.hash(newPassword, 10);
//     }

//     // If variable is not undefined (falsy), uses that. Otherwise, reassigns preexisting value (don't know if you can do that)
//     await user.update({ userName: newUsername || user.userName, userEmail: newEmail || user.userEmail, hashedPassword: newHashedPassword || user.hashedPassword })

//     res.status(200).json({ user });
// }))

// Log-in
router.post('/users/token', validateEmailAndPassword, handleValidationErrors, asyncHandler(async (req, res, next) => {
    // Get values from form:
    const { email, password } = req.body;
    try {
        // Find user with email:
        const user = await User.findOne({ where: { userEmail: email } });

        // If user is not found or password does not match, make new error object:
        if (!user || !user.validatePassword(password)) {
            const err = new Error("Login failed");
            err.status = 401;
            err.title = "Login failed";
            err.errors = ["The provided credentials were invalid."];

            return next(err);
        }

        // Generate JWT token and send JSON response with token and user ID
        const token = getUserToken(user);
        res.json({ token, user: { id: user.id, name: user.userName }, });
    } catch (e) {
        console.log(e)
    }

}));





module.exports = router;

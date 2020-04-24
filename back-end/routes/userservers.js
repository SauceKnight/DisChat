const express = require('express');

const { UserServer } = require('../db/models');
const { asyncHandler, handleValidationErrors } = require('../utils');
const { check } = require("express-validator");

const router = express.Router();

router.post('/userservers', asyncHandler(async (req, res, next) => {

    const { joinServerId, UserId } = req.body;

    await UserServer.findOrCreate({ where: { ServerId: joinServerId, UserId: UserId } });

    res.status(200);
    // const [user, created] = await User.findOrCreate({
    //   where: { username: 'sdepold' },
    //   defaults: {
    //     job: 'Technical Lead JavaScript'
    //   }
    // });
}))

module.exports = router;

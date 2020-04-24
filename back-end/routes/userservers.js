const express = require('express');

const { UserServer } = require('../db/models');
const { asyncHandler, handleValidationErrors } = require('../utils');
const { check } = require("express-validator");

const router = express.Router();

router.post('/userservers', asyncHandler(async (req, res, next) => {

    const { joinServerId, UserId } = req.body;

    await UserServer.findOrCreate({ where: { ServerId: joinServerId, UserId: UserId } });

    res.status(200);
}))

router.delete('/userservers/:user_id/:server_id', asyncHandler(async (req, res, next) => {

    const userId = parseInt(req.params.user_id, 10)
    const serverId = parseInt(req.params.server_id, 10)

    const entry = await UserServer.findOne({ where: { UserId: userId, ServerId: serverId } });

    await entry.destroy();

}))

module.exports = router;

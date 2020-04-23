const express = require('express');

const { Channel } = require('../db/models');
const { asyncHandler } = require('../utils');
// const messagesRouter = require('./messages');

const router = express.Router();

// router.use('/channels/:channel_id', messagesRouter);

router.get('/servers/:server_id/channels', asyncHandler(async (req, res, next) => {
    const serverid = parseInt(req.params.server_id, 10);
    const channels = await Channel.findAll({ where: { ServerId: serverid }, order: [['id', 'DESC']] });
    res.json({ channels });
}));

router.get('/channels/:channel_id', asyncHandler(async (req, res, next) => {
    const channelId = parseInt(req.params.channel_id, 10);

    const channel = await Channel.findByPk(channelId);

    res.json({ channel });
}));

router.post('/servers/:server_id/channels', asyncHandler(async (req, res, next) => {
    const serverId = parseInt(req.params.server_id, 10);
    const { channelName } = req.body;

    const channel = await Channel.create({ channelName, ServerId: serverId })
    res.status(200).json({ channel });
}));

router.put('/channels/:channel_id', asyncHandler(async (req, res, next) => {
    const channelid = req.params.channel_id;
    const { channelname } = req.body;
    const channel = await Channel.findByPk(channelid);
    await channel.update({ channelName: channelname });
    res.json(channel);
}))

router.delete('/channels/:channel_id', asyncHandler(async (req, res, next) => {
    const channelId = parseInt(req.params.channel_id, 10);

    const channel = await Channel.findByPk(channelId);

    await channel.destroy();

    res.status(200);

}));

module.exports = router;

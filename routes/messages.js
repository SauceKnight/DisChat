const express = require('express');

const { Message, User } = require('../db/models');
const { asyncHandler } = require('../utils');

const router = express.Router();

router.get('/channels/:channel_id/messages', asyncHandler(async (req, res, next) => {
    const channelId = parseInt(req.params.channel_id, 10);

    const messages = await Message.findAll(
        { where: { ChatId: channelId }, order: [['createdAt']], include: User }
    );
    // const user = await User.findByPk({});

    res.status(200).json({ messages });
}));
// {
//     messageContent: chatInput.value,
//         UserId: userId,
//             ChatId: currentChannelId,
//                 username: user
// })
router.post('/channels/:channel_id/messages', asyncHandler(async (req, res, next) => {
    // const channelId = parseInt(req.params.channel_id, 10);
    const { messageContent, ChatId, UserId } = req.body;

    const message = await Message.create({ messageContent, ChatId, UserId });
    res.json({ message });
}))





// router.post('/messages', asyncHandler(async (req, res, next) => {
//     // const { /* message var  */ } = req.body;
//     // const message = await Message.create({  })
// }));

module.exports = router;

const express = require('express');

const { Server, UserServer, User, Channel } = require('../db/models');
const { asyncHandler, handleValidationErrors } = require('../utils');
const { check } = require("express-validator");

const router = express.Router();


const validateServername = [
    check("serverName")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a server name.")
]


router.get('/servers/:server_id', asyncHandler(async (req, res, next) => {
    const serverId = parseInt(req.params.server_id, 10);

    const server = await Server.findByPk(serverId);

    res.json({ server });
}));

router.post('/:user_id/servers', validateServername, handleValidationErrors, asyncHandler(async (req, res, next) => {
    try {
        const { serverName } = req.body;
        const userId = parseInt(req.params.user_id, 10);


        const server = await Server.create({ serverName })
        await UserServer.create({ ServerId: server.id, UserId: userId })

        res.json({ server });
    } catch (e) {
        console.log(e);
    }
}));




router.put('/servers/:server_id', asyncHandler(async (req, res, next) => {
    const serverId = parseInt(req.params.server_id, 10);

    // const { VARIABLES GO HERE } = req.body;

    const server = await Server.findByPk(serverId);

    // await server.update({ Need to add information to update })

    res.json({ server });

}));

router.delete('/servers/:server_id', asyncHandler(async (req, res, next) => {
    const serverId = parseInt(req.params.server_id, 10);

    const server = await Server.findByPk(serverId);

    await server.destroy();

    res.status(200);
}))

router.get('/:user_id/servers', asyncHandler(async (req, res, next) => {

    const userId = parseInt(req.params.user_id, 10);

    const user = await User.findByPk(userId,
        {
            include:
            {
                model: Server,
                include: [{ model: Channel, order: [['id']] }, { model: User, attributes: ['userName'] }]
            }
        });
    const servers = user.Servers;
    res.json({ servers });
}));


router.put('/servers/find/:server', asyncHandler(async (req, res, next) => {

    const { userId } = req.body

    console.log(userId)
    try {
        const searchedServer = req.params.server;

        const foundServer = await Server.findOne({
            where: { serverName: searchedServer }
        })

        if (foundServer) {
            const userInServer = await UserServer.findOne({ where: { UserId: userId, ServerId: foundServer.id } })
            if (!userInServer) {
                res.json({ foundServer })
            } else {
                res.json('already in server')
            }

        } else {
            res.json('server not found')
        }
    } catch (e) {
        console.log(e)
    }
}))



module.exports = router;

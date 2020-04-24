'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Channels',
      [
        {
          channelName: "TEST-CHANNEL-1",
          ServerId: 1,
          createdAt: new Date(),
          updatedAt: new Date()

        },
        {
          channelName: "TEST-CHANNEL-2",
          ServerId: 1,
          createdAt: new Date(),
          updatedAt: new Date()

        },
        {
          channelName: "TEST-CHANNEL-3",
          ServerId: 1,
          createdAt: new Date(),
          updatedAt: new Date()

        },
      ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Channels", null, {});
  }
};

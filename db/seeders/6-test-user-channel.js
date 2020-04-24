'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'UserChannels',
      [
        {
          UserId: 1,
          ChatId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          UserId: 1,
          ChatId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          UserId: 1,
          ChatId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          UserId: 2,
          ChatId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("UserChannels", null, {});
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'UserServers',
      [
        {
          UserId: 1,
          ServerId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          UserId: 1,
          ServerId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          UserId: 1,
          ServerId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          UserId: 2,
          ServerId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("UserServers", null, {});
  }
};

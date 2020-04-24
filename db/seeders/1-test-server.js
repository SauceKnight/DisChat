'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Servers',
      [
        {
          serverName: "TEST-SERVER-1",
          createdAt: new Date(),
          updatedAt: new Date()

        },
        {
          serverName: "TEST-SERVER-2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          serverName: "TEST-SERVER-3",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Servers", null, {});
  }
};

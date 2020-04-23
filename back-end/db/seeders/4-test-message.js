'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Messages',
      [
        {
          messageContent: "If youre seeing this our database is working :)",
          ChatId: 1,
          UserId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          messageContent: "Im glad to see your database is working!",
          ChatId: 1,
          UserId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          messageContent: "If youre seeing this our database is working in our 2nd channel :)",
          ChatId: 2,
          UserId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          messageContent: "Im glad to see your database is working in the second channel!",
          ChatId: 1,
          UserId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Messages", null, {});
  }
};

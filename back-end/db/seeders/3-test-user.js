'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          userName: "TEST-USER",
          userEmail: "TEST@EMAIL.COM",
          hashedPassword: "PASS",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userName: "TEST-USER-2",
          userEmail: "TEST-2@EMAIL.COM",
          hashedPassword: "PASS",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};

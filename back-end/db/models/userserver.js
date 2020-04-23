'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserServer = sequelize.define('UserServer', {
    UserId: DataTypes.INTEGER,
    ServerId: DataTypes.INTEGER
  }, {});
  UserServer.associate = function(models) {
    // associations can be defined here
  };
  return UserServer;
};
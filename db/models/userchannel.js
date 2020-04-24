'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserChannel = sequelize.define('UserChannel', {
    UserId: DataTypes.INTEGER,
    ChannelId: DataTypes.INTEGER
  }, {});
  UserChannel.associate = function (models) {
    // associations can be defined here
  };
  return UserChannel;
};

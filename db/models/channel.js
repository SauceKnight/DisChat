'use strict';
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    channelName: DataTypes.STRING,
    ServerId: DataTypes.INTEGER
  }, {});
  Channel.associate = function (models) {
    // associations can be defined here
    Channel.belongsTo(models.Server, { foreignKey: 'ServerId' });
    Channel.hasMany(models.Message, { foreignKey: 'ChatId' });
    Channel.belongsToMany(models.User, {
      through: 'UserChannels',
      otherKey: 'UserId',
      foreignKey: 'ChatId'
    })
  };
  return Channel;
};

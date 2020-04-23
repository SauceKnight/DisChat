'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    messageContent: DataTypes.STRING,
    ChatId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  Message.associate = function (models) {
    // associations can be defined hereChannel.belongsTo(models.Server, { foreignKey: 'ServerId' });
    Message.belongsTo(models.Channel, { foreignKey: 'ChatId' });
    Message.belongsTo(models.User, { foreignKey: 'UserId' });
  };
  return Message;
};

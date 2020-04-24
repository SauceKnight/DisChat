'use strict';
module.exports = (sequelize, DataTypes) => {
  const Server = sequelize.define('Server', {
    serverName: DataTypes.STRING
  }, {});
  Server.associate = function (models) {
    // associations can be defined here
    Server.hasMany(models.Channel, { foreignKey: "ServerId" });
    Server.belongsToMany(models.User, {
      through: 'UserServer',
      otherKey: 'UserId',
      foreignKey: 'ServerId'
    })
  };
  return Server;
};

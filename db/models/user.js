const bcrypt = require('bcryptjs');

'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: DataTypes.STRING(30),
    userEmail: DataTypes.STRING(40),
    hashedPassword: DataTypes.STRING.BINARY
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Message, { foreignKey: 'UserId' });

    User.belongsToMany(models.Channel, {
      through: 'UserChannel',
      otherKey: 'ChatId',
      foreignKey: 'UserId'
    });

    User.belongsToMany(models.Server, {
      through: 'UserServer',
      otherKey: 'ServerId',
      foreignKey: 'UserId'
    });
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };


  return User;
};



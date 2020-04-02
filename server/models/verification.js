'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Verification extends Model { }

  Verification.init({
    UserId: DataTypes.INTEGER,
    code: DataTypes.INTEGER,
    email: DataTypes.STRING
  }, { sequelize });
  Verification.associate = function (models) {
    // associations can be defined here
    Verification.belongsTo(models.User)
  };
  return Verification;
};
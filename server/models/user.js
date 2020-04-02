'use strict';
const { hash } = require('../helper')

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class User extends Model { }
  User.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Fullname cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email cannot be empty'
        },
        isEmail: {
          msg: 'Invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty'
        }
      }
    },
    isVerified: DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreate(user, options) {
        user.password = hash(user.password)
      },
      beforeUpdate(user, options) {
        user.password = hash(user.password)
      }
    },
    sequelize
  });

  User.associate = function (models) {
    // associations can be defined here
    User.hasOne(models.Verification)
  };
  return User;
};
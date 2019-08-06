var bcrypt = require('bcrypt-nodejs');

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3],
            msg: "Password must be at least 3 characters"
          }
        }
      }
    },
    {
      //in order to guarantee that the password being provided by the user matches with what it is in database
      classMethods: {
        //our call back name is done
        validPassword: function (password, passwd, done, user) {
          bcrypt.compare(password, passwd, function (err, isMatch) {
            if (err) console.log(err);
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        }
      }
    },
    {
      //telling sequelize what sort of db it is working with
      dialect: 'mysql'
    }
  );

  //every time the user is being created we want to hash their password;turning it
  //into another string to perform one-way transformation of password

  // User.beforeCreate(function (user, fn) {
  //   //create random input
  //   var salt = bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
  //     return salt;
  //   });
  //   bcrypt.hash(user.password, salt, null, function (err, hash) {
  //     if (err) return next(err);
  //     user.password = hash;
  //     return fn(null, user);
  //   });
  // });
  return User;
};

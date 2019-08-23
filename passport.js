// const localstrategy = require("passport-local").Strategy;

const jwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");

const config = require("./config/config");

const db = require("./models");

module.exports = function(passport) {
  try {
    passport.use(
      "jwt",
      new jwtStrategy(
        {
          //Where the token is coming and
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("bearer"),
          //what secret should be used to decode
          secretOrKey: config.env.JWT_KEY
        },
        async (jwt_payload, done) => {
          console.log(jwt_payload);
          try {
            //find the user specified in token
            const user = await db.User.findOne(jwt_payload.id);
            console.log("user passjwt:" + user);
            //if user doesn't exist, handle it
            if (!user) {
              return done(null, false);
            }
            //otherwise return the user
            done(null, user);
          } catch (error) {
            done(error, false);
          }
        }
      )
    );
  } catch (e) {
    console.log("PASSPORT ERROR: ", e);
  }
};

// module.exports = function(passport) {
//   passport.use(
//     new localstrategy(
//       {
//         usernameField: "username"
//       },
//       (username, password, done) => {
//         //Match user
//         User.findOne({ username: username })
//           .then(user => {
//             if (!user) {
//                 return done(null, false, {message: "That email is not registered"})
//             }
//             //Match Password

//           })
//           .catch(err => console.log(err));
//       }
//     )
//   );
// };

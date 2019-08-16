// const passport = require("passport");
// const jwtStrategy = require("passport-jwt").Strategy;
// const { ExtractJwt } = require("passport-jwt");

// const { JWT_SECRET } = require("./config")

// passport.use(new jwtStrategy({
//     //Where the token is coming and
//     jwtFromRequest : ExtractJwt.fromHeader('authorization'),
//     //what secret should be used to decode
//     secretOrKey : JWT_SECRET

// }, async(payload, done) =>{
//     try{
//         //find the user specified in token
//         const user= await user.findById(payload.sub);
//         //if user doesn't exist, handle it
//         if(!user){
//             return done(null, false);
//         }
//         //otherwise return the user
//         done(null, user);
//     }catch(error){
//         done(error,false)
//     }
// }));

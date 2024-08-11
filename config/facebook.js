const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/User')

module.exports = function(passport){
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        // callbackURL: "http://127.0.0.1:3001/auth/facebook/callback",
        callbackURL: "/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email']
      },
      async(token, tokenSecret, profile, cb)=> {
    //     try{
    //         console.log('facebook profile',profile)
    //         User.findOrCreate({ facebook: profile.id }, function (err, user) {
    //             return cb(err, user);
    //           });
    //     }catch(err){
    //         console.log(err)
    //     }
    const newUser = {
        Id: profile.id,
        displayName: profile.displayName,
        firstName: profile.username,
        lastName: profile.name.familyName,
        image: profile.photos[0].value,
        loginType:'facebook'
    }
    try{
        // console.log(profile)
        let user = await User.findOne({Id: profile.id})
        if(user){
            cb(null,user)
        }else{
            user = await User.create(newUser)
            cb(null,user)
        }
    }catch(err){
        console.error(err)
    }
      }
        
    ));
    
}
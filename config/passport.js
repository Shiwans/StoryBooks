// const passport= require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose= require('mongoose')
const User = require('../models/User')

//this argument passport we have send it from app.js file 
module.exports = function(passport){
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async(accessToken,refeshToken,profile,done)=>{
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        }
        try{
            let user = await User.findOne({googleId: profile.id})
            if(user){
                done(null,user)
            }else{
                user= await User.create(newUser)
                done(null,user)
            }
        }catch(err){
            console.error(err)
        }
    }))

    //serializing and deserializing of user
    passport.serializeUser( (user,done)=>{
        done(null,user.id)
    })

    // passport.deserializeUser((id,done)=>{
    //     User.findById(id,(err,user)=>done(err,user))
    // })  //face error as findbyid no longer accepts a callback
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });

}
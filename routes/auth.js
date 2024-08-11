const express = require('express')
const router = express.Router()
const passport = require('passport')

//description:-   Auth with google
//route:-  GET /auth/google
//using things that we created in passport js file
router.get('/google',passport.authenticate('google',{scope:['profile']} ))

//description:-   google auth callback
//route:-  GET /auth/google/callback
router.get('/google/callback',passport.authenticate('google',{failureRedirect:'/'}),(req,res)=>{
    res.redirect('/dashboard')
})

//description     logout user
/// routte   /auth/logout
// router.get('/logout',(req,res)=>{
//     req.logout()
//     res.redirect('/')
// })
//Having callback error so solved it here
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); } // Handle any errors
        res.redirect('/'); // Redirect after logout
    });
});

//facebook
//description:-   Auth with facebook
//route:-  GET /auth/facebook
//using things that we created in facebook js file
// router.get('/facebook',passport.authenticate('facebook',{scope:['profile']} ))
router.get('/facebook',passport.authenticate('facebook'));

//description:-   facebook auth callback
//route:-  GET /auth/facebook/callback
router.get('/facebook/callback',passport.authenticate('facebook',{failureRedirect:'/'}),(req,res)=>{
    res.redirect('/dashboard')
})

module.exports = router
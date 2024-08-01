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

module.exports = router
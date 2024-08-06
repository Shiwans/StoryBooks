//creating basic express server
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session= require('express-session')
// const MongoStore = require('connect-mongo')(session)//error due to change in synatx
const MongoStore = require('connect-mongo') 
const connectDB = require('./config/db')


//load config
dotenv.config({path: './config/config.env'})

//passport config
require('./config/passport')(passport)
// require('./config/passport')

//calling database function
connectDB()

const app = express()

//Body parser {middleware for form data in stories}
app.use(express.urlencoded({extended:false}))
app.use(express.json())//for json data


//method override to use put and delete methods functionalities
app.use(methodOverride(function (req,res){
    if(req.body && typeof req.body === 'object' && '_method' in req.body){
        let method = req.body._method
        delete req.body._mehtod
        return method
    }
}))

//morgan
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
    //now it will show the methods of HTTP in consoles
}

//Handlebars Helpers
const {formatDate, stripTags, truncate, editIcon, select} = require('./helpers/hbs')

//handlebars
app.engine('.hbs',exphbs.engine({helpers:{
    formatDate, stripTags,truncate,editIcon,select
},defaultLayout:'main',extname:'.hbs'}))
app.set('view engine','.hbs')

// Create a new MongoStore instance
const store = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions'
});

//sesssion middleware{always to be before passport middlware}
app.use(
  session({
    secret:'shiwans',
    resave: false,
    saveUninitialized:false,
    store: store
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session()) //in order to make this work we need express-session

//set global var
app.use(function (req,res,next){
    res.locals.user = req.user || null
    next()
})

//static folder
app.use(express.static(path.join(__dirname,'public')))

//Rotues
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))
app.use('/stories',require('./routes/stories'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on ${process.env.NODE_ENV} node on port ${PORT}`))
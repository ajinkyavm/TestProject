const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const cors = require('cors');
const responseHandler = require('./middleware/responseHandler');
const autoIncrement = require('mongoose-auto-increment');
const route = require('./routes/route');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'Client')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(responseHandler);
// add routes
app.use('/api',route);

// add cors
app.use(cors());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    res.status(404);
    res.json(0,`Requested page not found 404`,next);
});


// error handler
app.use(function(err, req, res, next) {
    // log the error, treat it like a 500 internal server error
    // maybe also log the request so you have more debug information
    //log.error(err, req);

    // during development you may want to print the errors to your console
    //console.log(err.stack);

    // send back a 500 with a generic message
    console.log("ON ERROR",err)
    res.status(500);
    res.json(-1,`Error on Server ${err}`,next);

});



//connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/themeboard');

//on Connection on mongodb

mongoose.connection.on("connected",()=>{
    console.log("Connected to database mongodb @27017")
});

//on error on mongoDB
mongoose.connection.on("error",(err)=>{
    if(err){
        console.log("Error in connection to database mongodb @27017",err)
    }

});



module.exports = app;

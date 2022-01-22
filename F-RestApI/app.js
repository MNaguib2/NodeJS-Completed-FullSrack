const express = require('express');
const bodyparse = require('body-parser');
const feedRoutes = require('./routing/feedback');
const app = express();
const path = require('path');
const multer =require('multer');
const _dirname= path.dirname(process.mainModule.filename);

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    }
    ,
    filename: (req, file, cb) => {
      //console.log(new Date().toISOString().replace(/:/g, '')/*.replace(/\..+/, '')*/ + '-' + file.originalname);
        cb(null , new Date().toISOString().replace(/:/g, '') + '-' + file.originalname.replace(/ /g, ''));
    }
})
const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
//console.log(__dirname); //this is globally direct
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('file'));
app.use('/Images',express.static(path.join(_dirname, 'Images')));

// app.use(bodyparse.urlencoded({extends : false}));// x-www-form-urlencoded <form> we don't need form data to now work with in api
app.use(bodyparse.json()); // application/json

app.use((req, res, next) => { //this to solve problem CORS Error listen to video  8. REST APIs, Clients & CORS Errors
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed' , feedRoutes);

app.listen('3000');
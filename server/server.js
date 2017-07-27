const path = require('path');
//const http = require('http');
var imgur = require('imgur');

const express = require('express');
 var multer = require('multer');
 var bodyParser = require('body-parser');

var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});

const publicPath = path.join(__dirname, '../public');
//const port = process.env.PORT || 3000;
var app =express();
app.use(bodyParser.json());
//app.use("/public/css",express.static(publicPath+'/css'));


//var server = http.createServer(app);
app.use(express.static(publicPath));

// Setting Imgur clientid
imgur.setClientId('8386becd1a4c3ad');

//Setting
imgur.setAPIUrl('https://api.imgur.com/3/');

// Setting credentials
imgur.setCredentials('deepak_dj26@hotmail.com', 'tatanano_11', '8386becd1a4c3ad');


var Storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "./images");
     },
     filename: function(req, file, callback) {
                callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
     }
 });

var upload = multer({
     storage: Storage
 }).array("imgUploader", 3); //Field name and max count


app.get("/", function(req, res) {
     res.sendFile(publicPath+ "/index.html");
 });

 app.post("/api/Upload", function(req, res) {
     upload(req, res, function(err) {
         if (err) {
             return res.end("Something went wrong!");
         }
            

     
          var resizefile=  gm(req.files[0].path)
            .resizeExact(755, 450)
            .write(imgur.uploadFile(req.files[0].fieldname + "_" + Date.now()+"_2" + "_" + req.files[0].originalname)
        .then(function (json) {
            console.log(json.data.link);
        })
        .catch(function (err) {
            console.error(err.message);
        }) , function (err) {
            if (!err) console.log('done');
            else console.log(err);
            });


            gm('images/'+req.files[0].filename)
            .resizeExact(365, 450)
            .write('images/'+req.files[0].fieldname + "_" + Date.now()+"_2" + "_" + req.files[0].originalname, function (err) {
            if (!err) console.log('done');
            });

            gm('images/'+req.files[0].filename)
            .resizeExact(365, 212)
            .write('images/'+req.files[0].fieldname + "_" + Date.now() +"_3"+ "_" + req.files[0].originalname, function (err) {
            if (!err) console.log('done');
            });

            gm('images/'+req.files[0].filename)
            .resizeExact(380, 380)
            .write('images/'+req.files[0].fieldname + "_" + Date.now() +"_4" + "_" +req.files[0].originalname, function (err) {
            if (!err) console.log('done');
            });

         
         return res.end("File uploaded sucessfully!.");
       //     return res.redirect('images.html');
     });
 });

  app.listen(2000, function(a) {
     console.log("Listening to port 2000");
 });


/*server.listen(port, () =>{
    console.log(`Server is up on port ${port}`);
    
});*/
//console.log(temp);

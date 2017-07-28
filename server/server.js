const path = require('path');
const http = require('http');
var imgur = require('imgur');

const url = require('url');

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
imgur.setClientId('eb9e892f4538b23');

//Setting
imgur.setAPIUrl('https://api.imgur.com/3/');

// Setting credentials
imgur.setCredentials('deepak_dj26@hotmail.com', 'tatanano_11', 'eb9e892f4538b23');


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

/*app.get("/images", function(req, res) {
     res.sendFile(publicPath+ "/images.html");
 });
*/

    function readFilesName(){
        var albumId = 'Ex9l7';
        var images =[];  
        fs.readdir(publicPath+"/images", function(err, items) {
        items.forEach(function(file){
                imgur.uploadFile('public/images/'+file, albumId)
                .then(function (json) {
                    console.log(json.data.link);
                })
                .catch(function (err) {
                    console.error(err.message);
                })
            });
        });
      };
    

 app.post("/api/Upload", function(req, res) {
     upload(req, res, function(err) {
         if (err) {
             return res.end("Something went wrong!");
         }
         if(req.body.submit== '755*450')
           { console.log(req.body);
                 gm(req.files[0].path)
            .resizeExact(755, 450)
            .write('public/images/'+req.files[0].fieldname + "_" + Date.now()+"_1" + "_" + req.files[0].originalname, function (err) {
                if (!err){
                    console.log('done'); 
                    readFilesName();   
                    } 
            else console.log(err);
        });
             
           }
        else if(req.body.submit== '365*450')
           { console.log(req.body);
                             gm('images/'+req.files[0].filename)
            .resizeExact(365, 450)
            .write('public/images/'+req.files[0].fieldname + "_" + Date.now()+"_2" + "_" + req.files[0].originalname, function (err) {
            if (!err){
                console.log('done');
                readFilesName();
                } 
           else console.log(err);
        });
             return res.redirect('/images');
           }

            else if(req.body.submit== '365*212')
           { console.log(req.body);
                gm('images/'+req.files[0].filename)
            .resizeExact(365, 212)
            .write('public/images/'+req.files[0].fieldname + "_" + Date.now() +"_3"+ "_" + req.files[0].originalname, function (err) {
            if (!err) {
                console.log('done');
                 readFilesName();
            }
            });
            return res.redirect('/images');
           }
                else if(req.body.submit== '380*380')
           { console.log(req.body);

               gm('images/'+req.files[0].filename)
            .resizeExact(380, 380)
            .write('public/images/'+req.files[0].fieldname + "_" + Date.now() +"_4" + "_" +req.files[0].originalname, function (err) {
            if (!err){
                 readFilesName();
             console.log('done');
            }
        });
         return res.redirect('/images');
   }


         else if(req.body.submit== 'Upload')
           { 
               console.log(req.body);

                gm(req.files[0].path)
            .resizeExact(755, 450)
            .write('public/images/'+req.files[0].fieldname + "_" + Date.now()+"_1" + "_" + req.files[0].originalname, function (err) {
                if (!err){
                    console.log('done');    
                    } 
            else console.log(err);
            });


            gm('images/'+req.files[0].filename)
            .resizeExact(365, 450)
            .write('public/images/'+req.files[0].fieldname + "_" + Date.now()+"_2" + "_" + req.files[0].originalname, function (err) {
            if (!err){
                console.log('done');
                } 
           else console.log(err);
        });
 

            gm('images/'+req.files[0].filename)
            .resizeExact(365, 212)
            .write('public/images/'+req.files[0].fieldname + "_" + Date.now() +"_3"+ "_" + req.files[0].originalname, function (err) {
            if (!err) console.log('done');
            });

            gm('images/'+req.files[0].filename)
            .resizeExact(380, 380)
            .write('public/images/'+req.files[0].fieldname + "_" + Date.now() +"_4" + "_" +req.files[0].originalname, function (err) {
            if (!err){
                 readFilesName();
             console.log('done');
            }
        });
         return res.redirect('/images');
        }

/*
          var resizefile1=  gm(req.files[0].path)
            .resizeExact(755, 450);



           var resizefile2=  gm('images/'+req.files[0].filename)
            .resizeExact(365, 450);
            

           var resizefile3= gm('images/'+req.files[0].filename)
            .resizeExact(365, 212);

           var resizefile4= gm('images/'+req.files[0].filename)
            .resizeExact(380, 380);

*/          // uploading single photo
        /*    imgur.uploadFile(resizefile1.source)
            .then(function (json) {
                console.log(json.data.link);
            })
            .catch(function (err) {
                console.error(err.message);
            })
*/
            // uploading multiple photos
         //   imgur.uploadImages(images, 'File' /*, albumId */)
 /*           .then(function(images) {
                console.log(images);
            })
            .catch(function (err) {
                console.error(err.message);
            });
*/

           return res.redirect('/images');
     });
 });




  app.listen(2000, function(a) {
     console.log("Listening to port 2000");
 });

    app.get('/images', function(req, res, next) {
        var InsiderAlbum = 'Ex9l7';
        imgur.getAlbumInfo(InsiderAlbum)
        .then(function(json) {
        //  console.log(json);
        var imageLists = '';
                for (var i=0; i<json.data.images_count; i++) {
                    imageLists += '<img height="200px" width="200px" src="' + json.data.images[i].link +  '"/>';        
                }
                imageLists += '';
                res.writeHead(200, {'Content-type':'text/html'});
                res.end(imageLists);
        })
        .catch(function (err) {
            console.error(err.message);
        });
    });


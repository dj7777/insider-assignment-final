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
 app.post("/api/Upload", function(req, res) {
     upload(req, res, function(err) {
         if (err) {
             return res.end("Something went wrong!");
         }
            

          var resizefile1=  gm(req.files[0].path)
            .resizeExact(755, 450);



           var resizefile2=  gm('images/'+req.files[0].filename)
            .resizeExact(365, 450);
            

           var resizefile3= gm('images/'+req.files[0].filename)
            .resizeExact(365, 212);

           var resizefile4= gm('images/'+req.files[0].filename)
            .resizeExact(380, 380);

          // uploading single photo
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

            var resizefile1=  gm(req.files[0].path)
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

function readFilesName(){
     var images =[];  
   fs.readdir(publicPath+"/images", function(err, items) {
   
//console.log(items);

 items.forEach(function(file){
            imgur.uploadFile('public/images/'+file)
            .then(function (json) {
                console.log(json.data.link);
            })
            .catch(function (err) {
                console.error(err.message);
            })
     });
 });
 }
            return res.redirect('/images');
     });
 });




  app.listen(2000, function(a) {
     console.log("Listening to port 2000");
 });

 app.get('/images', function(req, res, next) {

//var jsonRes='';
 var kittenAlbum = 'wnst8';
    imgur.getAlbumInfo(kittenAlbum)
    .then(function(json) {
      //  console.log(json);
       var imageLists = '';
            for (var i=0; i<json.data.images_count; i++) {
               // console.log('hello');
             //   imageLists += '<li><a href="/?image=' + files[i] + '">' + files[i] + '</li>';
                imageLists += '<img height="200px" width="200px" src="' + json.data.images[i].link +  '"/>';
        
            }
            imageLists += '';
            res.writeHead(200, {'Content-type':'text/html'});
            res.end(imageLists);

      //  console.log(json.data.images[1].link);
    //    jsonRes= json;
    
/*res.setHeader('Access-Control-Allow-Origin', '/images');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.send(JSON.stringify({ data: json }));  
*/  //res.sendFile(publicPath + '/images.html', JSON.stringify({data: req.body}));

    })
    .catch(function (err) {
        console.error(err.message);
    });



    // console.log(jsonRes);
  //res.json({ data: jsonRes });
});


/*server.listen(port, () =>{
    console.log(`Server is up on port ${port}`);
    
});*/
//console.log(temp);

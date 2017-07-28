var imgur = require('imgur');
// Setting
imgur.setClientId('8386becd1a4c3ad');

// Getting
//imgur.getClientId();

//Setting
imgur.setAPIUrl('https://api.imgur.com/3/');

//If setAPIUrl() is not called, API URL is read from process.env.IMGUR_API_URL

//Getting

//Setting

// Setting
imgur.setCredentials('deepak_dj26@hotmail.com', 'tatanano_11', '8386becd1a4c3ad');
/*
// A single image
imgur.uploadFile('images/imgUploader_1501169700617_4_2.JPG')
    .then(function (json) {
        console.log(json.data.link);
    })
    .catch(function (err) {
        console.error(err.message);
    });

*/

var kittenAlbum = 'wnst8';
imgur.getAlbumInfo(kittenAlbum)
    .then(function(json) {
        var imageLists ='';
        for(var i=0;i<json.data.images_count;i++){
             imageLists += '<img height="200px" width="200px" src="/?image=' + files[i] +  '"/>';
        }
        console.log(json.data.images[i].link);
    })
    .catch(function (err) {
        console.error(err.message);
    });

 //   Node JS file code:
app.get('/test', function(req, res, next) {
  res.json({ message: 'Hello World' });
});
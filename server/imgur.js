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

// A single image
imgur.uploadFile('images/imgUploader_1501169700617_4_2.JPG')
    .then(function (json) {
        console.log(json.data.link);
    })
    .catch(function (err) {
        console.error(err.message);
    });


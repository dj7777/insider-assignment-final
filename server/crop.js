var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});

// resize and remove EXIF profile data
/*gm('images/8.jpg')
.resize(755, 450)
.noProfile()
.write('images/8_1.jpg', function (err) {
  if (!err) console.log('done');
  
});

// 365 * 450
gm('images/8.jpg')
.resize(365, 450)
.noProfile()
.write('images/8_2.jpg', function (err) {
  if (!err) console.log('done');
  
});

//  365*212
gm('images/8.jpg')
.resize(365, 212)
.noProfile()
.write('images/8_3.jpg', function (err) {
  if (!err) console.log('done');
  else{
      console.log(err);
  }
});

//   380*380
gm('images/8.jpg')
.resize(380, 380)
.noProfile()
.write('images/8_4.jpg', function (err) {
  if (!err) console.log('done');
  else{
      console.log(err);
  }
});

*/

// some files would not be resized appropriately
// http://stackoverflow.com/questions/5870466/imagemagick-incorrect-dimensions
// you have two options:
// use the '!' flag to ignore aspect ratio
/*gm('/path/to/my/img.jpg')
.resize(240, 240, '!')
.write('/path/to/resize.png', function (err) {
  if (!err) console.log('done');
});
*/
// use the .resizeExact with only width and/or height arguments
gm('images/8.jpg')
.resizeExact(755, 450)
.write('images/8_5.png', function (err) {
  if (!err) console.log('done');
});


gm('images/8.jpg')
.resizeExact(365, 450)
.write('images/8_6.png', function (err) {
  if (!err) console.log('done');
});

gm('images/8.jpg')
.resizeExact(365, 212)
.write('images/8_7.png', function (err) {
  if (!err) console.log('done');
});

gm('images/8.jpg')
.resizeExact(380, 380)
.write('images/8_8.png', function (err) {
  if (!err) console.log('done');
});








// obtain the size of an image
gm('images/1.jpg')
.size(function (err, size) {
  if (!err)
    console.log(size.width > size.height ? 'wider' : 'taller than you');
});

// output all available image properties
/*gm('images/1.jpg')
.identify(function (err, data) {
  if (!err) console.log(data)
});
*/
// pull out the first frame of an animated gif and save as png
/*gm('/path/to/animated.gif[0]')
.write('/path/to/firstframe.png', function (err) {
  if (err) console.log('aaw, shucks');
});
*/
// auto-orient an image
/*gm('/path/to/img.jpg')
.autoOrient()
.write('/path/to/oriented.jpg', function (err) {
  if (err) {}
})
*/
// crazytown
/*gm('images/1.jpg')
.flip()
.magnify()
.rotate('green', 45)
.blur(7, 3)

.crop(300, 300, 150, 130)
.edge(3)
.write('images/1_crop.jpg', function (err) {
  if (!err) console.log('crazytown has arrived');
})
*/
// annotate an image
/*gm('/path/to/my/img.jpg')
.stroke("#ffffff")
.drawCircle(10, 10, 20, 10)
.font("Helvetica.ttf", 12)
.drawText(30, 20, "GMagick!")
.write("/path/to/drawing.png", function (err) {
  if (!err) console.log('done');
});
*/
/*
// creating an image
gm(200, 400, "#ddff99f3")
.drawText(10, 50, "from scratch")
.write("/path/to/brandNewImg.jpg", function (err) {
  // ...
});*/
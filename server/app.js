var sizeOf = require('image-size');
sizeOf('images/2.jpg', function (err, dimensions) {
  if(dimensions.width == 1024 && dimensions.height== 1024)
    console.log(dimensions.width, dimensions.height);
  else
    console.log('Please upload image of appropriate size');

});
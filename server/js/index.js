/* $(document).ready(function() {
                var options = {
                        beforeSubmit: showRequest, // pre-submit callback success: showResponse 
                        // post-submit callback 
                    }; 
                    // bind to the form's submit event 
                    $('#frmUploader').submit(function () { $(this).ajaxSubmit(options); 
                        // always return false to prevent standard browser submit and page navigation return false;
                     }); }); 
                     // pre-submit callback
                      function showRequest(formData, jqForm, options) 
                      { alert('Uploading is starting.'); 
                      return true; } 
                      // post-submit callback 
                      function showResponse(responseText, statusText, xhr, $form) 
                      { alert('status: ' + statusText + '\n\nresponseText: \n' + responseText );
                     }*/

var _URL = window.URL || window.webkitURL;
$("#photoInput").change(function (e) {
    var file, img;
    if ((file = this.files[0])) {
        img = new Image();
        img.onload = function () {
            alert(this.width + " " + this.height);
        };
        img.src = _URL.createObjectURL(file);
        alert(img.src);
    }
});
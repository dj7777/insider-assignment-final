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
/*
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

*/
$(document).ready(function() {
    $("#previewCont").hide();
    $("#photoInput").change(function () {
         $("#dvPreview755").html("");
         $("#dvPreview365").html("");
         $("#dvPreview212").html("");
         $("#dvPreview380").html("");
        
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
        if (regex.test($(this).val().toLowerCase())) {
           /* if ($.browser.msie && parseFloat(jQuery.browser.version) <= 9.0) {
                $("#dvPreview").show();
                $("#dvPreview")[0].filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = $(this).val();
            }
            else {*/
                if (typeof (FileReader) != "undefined") {
                    $("#dvPreview755").show();
                    $("#dvPreview755").append("<img />");

                     $("#dvPreview365").show();
                    $("#dvPreview365").append("<img />");

                    $("#dvPreview212").show();
                    $("#dvPreview212").append("<img />");

                     $("#dvPreview380").show();
                    $("#dvPreview380").append("<img />");

                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $("#dvPreview755 img").attr("src", e.target.result).attr("height",755).attr("width",450);
                         $("#dvPreview365 img").attr("src", e.target.result).attr("height",365).attr("width",450);
                         $("#dvPreview212 img").attr("src", e.target.result).attr("height",365).attr("width",212);
                        $("#dvPreview380 img").attr("src", e.target.result).attr("height",380).attr("width",380);
                      
                    }
                    reader.readAsDataURL($(this)[0].files[0]);
                }
                else {
                    alert("This browser does not support FileReader.");
                }
        //    }
        } /*else {
            alert("Please upload a valid image file.");
        }*/
    });
});
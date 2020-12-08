function formSubmit(form) {
    let url=window.location.href;
    if(url.includes("search"))
    {
        const split=url.split("/");
        const slice=split.slice(0, -1);
        url=slice.join("/");
    }
    if(url.includes("?")){
        const split=url.split("?");
        const slice=split.slice(0, -1);
        url=slice;
    }
    form.action = url+ "/search";

    // alert(form.action);
    return true;
}

$(document).ready(function() {


    const readURL = function(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                $('.avatar').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }


    $(".file-upload").on('change', function(){
        readURL(this);
    });
});
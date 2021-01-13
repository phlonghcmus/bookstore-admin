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

function addValidate(form)
{
    const name=document.getElementById("title").value;
    const detail=document.getElementById("detail").value;
    const author=document.getElementById("author").value;
    const price=document.getElementById("price").value;
    const stock=document.getElementById("stock").value;
    const avatar=document.getElementById("avatar").value;
    if(name.length==0)
    {
        alert("Bạn phải nhập tên sản phẩm");
        return false;
    }
    if(detail.length==0)
    {
        alert("Bạn phải nhập mô tả sản phẩm");
        return false;
    }
    if(author.length==0)
    {
        alert("Bạn phải nhập tên tác giả");
        return false;
    }
    if(price.length==0)
    {
        alert("Bạn phải nhập giá sản phẩm");
        return false;
    }
    if(stock.length==0)
    {
        alert("Bạn phải nhập số lượng sản phẩm trong kho");
        return false;
    }
    if(avatar.length==0)
    {
        alert("Bạn phải chèn hình sản phẩm");
        return false;
    }
    let isnum = /^\d+$/;
    if(!isnum.test(price))
    {
        alert("Giá sản phẩm phải là một con số nguyên dương");
        return false;
    }

    if(!isnum.test(stock))
    {
        alert("Số lượng sản phẩm phải là một con số nguyên dương");
        return false;
    }
    return true;
}

function updateValidate(form)
{
    const name=document.getElementById("title").value;
    const detail=document.getElementById("detail").value;
    const author=document.getElementById("author").value;
    const price=document.getElementById("price").value;
    const stock=document.getElementById("stock").value;
    const sold=document.getElementById("sold").value;
    if(name.length==0)
    {
        alert("Bạn phải nhập tên sản phẩm");
        return false;
    }
    if(detail.length==0)
    {
        alert("Bạn phải nhập mô tả sản phẩm");
        return false;
    }
    if(author.length==0)
    {
        alert("Bạn phải nhập tên tác giả");
        return false;
    }
    if(price.length==0)
    {
        alert("Bạn phải nhập giá sản phẩm");
        return false;
    }
    if(stock.length==0)
    {
        alert("Bạn phải nhập số lượng sản phẩm trong kho");
        return false;
    }
    if(sold.length==0)
    {
        alert("Bạn phải nhập số lượng sản phẩm đã bán");
        return false;
    }
    let isnum = /^\d+$/;
    if(!isnum.test(price))
    {
        alert("Giá sản phẩm phải là một con số nguyên dương");
        return false;
    }

    if(!isnum.test(stock))
    {
        alert("Số lượng sản phẩm phải là một con số nguyên dương");
        return false;
    }

    if(!isnum.test(sold))
    {
        alert("Số lượng sản phẩm đã bán phải là một con số nguyên dương");
        return false;
    } 
    return true;

}


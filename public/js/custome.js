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
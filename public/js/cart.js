ready(function () {

    console.log("Client script loaded.");

    function ajaxGET(url, callback) {

        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                //console.log('responseText:' + xhr.responseText);
                callback(this.responseText);

            } else {
                console.log(this.status);
            }
        }
        xhr.open("GET", url);
        xhr.send();
    }

    function ajaxPOST(url, callback, data) {
        let params = typeof data == 'string' ? data : Object.keys(data).map(
            function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');
        console.log("params in ajaxPOST", params);

        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                callback(this.responseText);

            } else {
                console.log(this.status);
            }
        }
        // if getting errors here, make sure sessions is working
        // check for mispellings in "/url"
        xhr.open("POST", url);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
    }

    var confirmbutton = document.getElementsByClassName("btnCart");

    for (var i = 0; i < confirmbutton.length; i++) {
        confirmbutton[i].addEventListener('click', function (e) {
                console.log("clicked button");
                let id = event.srcElement.parentElement.parentElement.id;
                console.log(id);
                date = new Date();
                date = date.toISOString();
                let queryString = "&date=" + date;
                const vars = { "date": date}
                ajaxPOST("/donation/confirmCart", function (data) {
                    let dataParsed = JSON.parse(data);
                    if (dataParsed.status == "success") {
                        window.location.replace('/donation/thanksreceiver')
                    }
                }, queryString)
        });
    }
})


    function ready(callback) {
        if (document.readyState != "loading") {
            callback();
            console.log("ready state is 'complete'");
        } else {
            document.addEventListener("DOMContentLoaded", callback);
            console.log("Listener was invoked");
        }
    }
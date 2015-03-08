$(document).ready(function() {

    console.log("Fetching json...");

    $.getJSON("../json/maena.json", function(data) {

        console.log("Working with json data...");

        $.each(data, function(key, val) {
            $(".container").append($.parseHTML(this.title1));
            $(".container").append($.parseHTML(this.title2));
            $(".container").append($.parseHTML(this.content));
            $(".container").append($.parseHTML(this.author));
        });
    });
});

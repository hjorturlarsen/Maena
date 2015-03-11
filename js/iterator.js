$(document).ready(function () {

    console.log("Fetching JSON...");

    $.getJSON("../json/maena.json", function (data) {

            console.log("Working with JSON data...");

            for (var item in data) {
                var article = data[item];
                if (data.hasOwnProperty(item)) {
                    for (var item in article) {
                        if(article.hasOwnProperty(item) && isNaN(item)) {
                            $('.articles-container').append($.parseHTML(article[item]));
                        }
                    }
                }
            }
        })
        .error(function () {
            console.log("Error working with JSON");
        })
        .complete(function () {
            console.log("Done working with JSON!");
        });
});

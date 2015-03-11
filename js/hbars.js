$(document).ready(function () {

    $.get("json/maena.json", function (data, status, xhr) {

        populate_menu();

        function populate_menu() { 
            var source = $("#efnisyfirlit_template").html();
            var template = Handlebars.compile(source);
            $(".dropdown-menu").append(template(data.menu_items));
        }
    });
});

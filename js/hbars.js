$(document).ready(function () {

    $.get("json/maena.json", function (data, status, xhr) {

    	writeSection(data);

        function writeSection(data) {
        	var source = $("#section_template").html();
        	var template = Handlebars.compile(source);
        	$(".articles-container").append(template(data));
        }

        function populate_menu() { 
            var source = $("#efnisyfirlit_template").html();
            var template = Handlebars.compile(source);
            $(".dropdown-menu").append(template(data.menu_items));
        }
    });
});

$(document).ready(function() {

    $.get("json/maena.json", function(data, status, xhr) {

        console.log("Fetching json");

        writeSection(data);

        function writeSection(data) {
            console.log("writing section")
            var source = $("#section_template").html();
            var template = Handlebars.compile(source);
            $("#fullpage").append(template(data));

            success: fullPage();
        }
    });

    function fullPage() {
        $('#fullpage').fullpage({
            navigation: true,
            anchors: ['sec0', 'sec1', 'sec2', 'sec3', 'sec4', 'sec5', 'sec6', 'sec7', 'sec8', 'sec9', 'sec10', 'sec11', 'sec12', 'sec13', 'sec14', 'sec15', 'sec16', 'sec17', 'sec18', 'sec19', 'sec20', 'sec21', 'sec22', 'sec23', 'sec24'],
            css3: true,
            fixedElements: '#header',
            scrollOverflow:true
        });
    }
});

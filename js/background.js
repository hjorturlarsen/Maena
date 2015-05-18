$(document).ajaxComplete(function() {

    var win = $(window);

    win.resize(function() {

        var win_w = win.width(),
            win_h = win.height(),
            ids = [],
            $bg;

        //Add id tags to the array that represent each article
        for (i = 1; i < 25; i++) {
            ids.push("#article_" + i + "-img");
        }

        // Load narrowest background image based on 
        // viewport width, but never load anything narrower 
        // that what's already loaded if anything.
        var widths = [320, 480, 640, 960, 1025, 1920];

        for (var i = 1; i < ids.length; i++) {
            $bg = $(ids[i]);

            var current = 320;

            if (!current || ((current < win_w) && (current < widths[widths.length - 1]))) {
                var chosen = widths[widths.length - 1];
                for (var j = 0; j < widths.length; j++) {
                    if (widths[j] >= win_w) {
                        chosen = widths[j];
                        break;
                    }
                }
                // Set the new image
                $bg.attr('src', '../image/background/' + chosen + '/Layer ' + i + '.jpg');
            }
        }
    }).resize();
});

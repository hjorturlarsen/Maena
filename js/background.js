(function() {

    var win = $(window);

    // Load narrowest background image based on 
    // viewport width, but never load anything narrower 
    // that what's already loaded if anything.
    var available = [
        1024, 1280, 1366,
        1400, 1680, 1920
    ];

    win.resize(function() {

        var win_w = win.width(),
            win_h = win.height(),
            ids = ['#bg0', '#bg1'],
            $bg;

            $.each(ids, function(index, id) {
            	$bg = $(id);
            	//If the file name has numbers, then we have a valid file name
            	var current = $bg.attr('src').match(/[0-9]+/) ? RegExp.$1 : null;
            	var current_index = $.inArray(current, available);
            	console.log("id: " + id + ", current: " + current);
            	console.log("index: " + current_index);

            	/*
            		If the current file is not defined or the
            		current image width is smaller than the window's width
            		Then we want to display a larger image.
            	*/
            	if(!current || (current < win_w) && (current < available[available.length-1])) {
            		var chosen = available[available.length -1];
            	}
            	/*
            		If the current file is not defined or the
            		current image width is smaller than the window's width
            		Then we want to display a smaller image.
            	*/
            	if(!current || (current > win_w) && (current > available[0])) {
            		var chosen = available[available]
            	}
            });

            

            if (!current || ((current < win_w) && (current < available[available.length - 1]))) {

                var chosen = available[available.length - 1];

                for (var i = 0; i < available.length; i++) {
                    if (available[i] >= win_w) {
                        chosen = available[i];
                        break;
                    }
                }

                // Set the new image
                $bg.attr('src', '../image/bg/' + chosen + '-' + index + '.jpg');

                // for testing...
                console.log(id + ': Chosen background: ' + chosen);

            }

            // Determine whether width or height should be 100%
            if ((win_w / win_h) < ($bg.width() / $bg.height())) {
                $bg.css({
                    height: '100%',
                    width: 'auto'
                });
            } else {
                $bg.css({
                    width: '100%',
                    height: 'auto'
                });
            }
    }).resize();

})(jQuery);

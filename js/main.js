(function($) {

    $(window).load(function() {

        /* ---------------------------------------------- /*
         * Preloader
        /* ---------------------------------------------- */
        $('.loader').fadeOut();
        $('.page-loader').delay(350).fadeOut('slow');
    });

    $(document).ready(function() {

        /* ---------------------------------------------- /*
         * Initialize some key variables
        /* ---------------------------------------------- */
        var navbar = $('.navbar-custom'),
            header1 = $('#header1'),
            header2 = $('#header2'),
            navHeight = navbar.height(),
            width = Math.max($(window).width(), window.innerWidth),
            active = $('.active'),
            mobileTest;

        //Updates the current active section
        $(window).scroll(function() {
            active = $('.section.active');
            //updateHeader();
        })

        navbar.hide();



        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            mobileTest = true;
        }

        $(".fancybox").fancybox({
            padding: 0,
            openEffect: 'elastic',
            openSpeed: 150,
            closeEffect: 'elastic',
            closeSpeed: 150,
            closeClick: true,
            helpers: {
                overlay: {
                    css: {
                        'background': 'rgba(0,0,0,0.85)'
                    }
                }
            }
        });

        /* ---------------------------------------------- /*
         * Get data from json file
        /* ---------------------------------------------- */
        $.get('json/maena.json', function(data) {
            success: writeArticles(data)
                .done(function() {
                    initFullpage();
                });
        });

        /* ---------------------------------------------- /*
         * Pass the json data to handlebars.js
        /* ---------------------------------------------- */
        function writeArticles(data) {
            var source = $("#article_template").html();
            var template = Handlebars.compile(source);
            $("#fullpage").append(template(data));
            return $.ajax();
        }

        /* ---------------------------------------------- /*
         * Initialize fullpage.js
        /* ---------------------------------------------- */
        function initFullpage() {
            $('#fullpage').fullpage({
                //Scrolling
                css3: true,
                //TODO
                //anchors:['', 'Inngangur', 'Sjónræn upplifun landkönnuða', ''],
                autoScrolling: false,
                fitToSection: false,
                scrollBar: false,
                easing: 'easeInOutCubic',
                easingcss3: 'ease',
                loopTop: false,
                loopHorizontal: false,
                continuousVertical: false,
                normalScrollElements: '.article',
                touchSensitivity: 15,
                normalScrollElementTouchThreshold: 5,
                scrollOverflow: true,

                //Accessibility
                keyboardScrolling: true,
                animateAnchor: true,
                recordHistory: true,

                //Design
                controlArrows: false,
                verticalCentered: true,
                resize: false,
                fixedElements: '#header',
                responsive: 900,

                //Custom selectors
                sectionSelector: '.section',
                slideSelector: '.slide',

                //events
                onLeave: function(index, nextIndex, direction) {
                    var leavingSection = $(this);
                    updateHeader(nextIndex);
                },
                afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {
                    if (slideIndex >= 1) {
                        $.fn.fullpage.setFitToSection(true);
                        $(window).trigger("scroll");
                    }
                },
                onSlideLeave: function(anchorLink, index, slideIndex, direction) {
                    if (slideIndex == 1) {
                        $.fn.fullpage.setFitToSection(false);
                    }
                }
            });

            //Prevent user from scrolling from article to article
            //without going back to the images.
            $('.article').on('mousewheel', function(e) {
                e.preventDefault();
                e.stopPropagation();
            });

            $('.article-icon').click(function() {
                $.fn.fullpage.moveSlideRight();
            });

            $('.content-icon').click(function() {
                $.fn.fullpage.moveSlideLeft();
            });
        }

        /* ---------------------------------------------- /*
         * Update header according to article
        /* ---------------------------------------------- */
        function updateHeader(index) {
            index -= 2;
            var title1 = $('#section' + index).find('.title1').text();
            var title2 = $('#section' + index).find('.title2').text();

            if (index < 1) {
                navbar.hide();
            } else {
                navbar.show();
            }
            if (title1 == 9) {
                header1.css('font-size', '1.5em');
            } else {
                header1.css('font-size', '2em');
            }
            header1.text(title1);
            header2.text(title2);
        }

        /* ---------------------------------------------- /*
         * Navbar hover dropdown on desktop
        /* ---------------------------------------------- */
        function hoverDropdown(width, mobileTest) {
            if ((width > 767) && (mobileTest != true)) {
                $('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').removeClass('open');
                var delay = 0;
                var setTimeoutConst;
                $('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').hover(function() {
                        var $this = $(this);
                        setTimeoutConst = setTimeout(function() {
                            $this.addClass('open');
                            $this.find('.dropdown-toggle').addClass('disabled');
                        }, delay);
                    },
                    function() {
                        clearTimeout(setTimeoutConst);
                        $(this).removeClass('open');
                        $(this).find('.dropdown-toggle').removeClass('disabled');
                    });
            } else {
                $('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').unbind('mouseenter mouseleave');
                $('.navbar-custom [data-toggle=dropdown]').not('.binded').addClass('binded').on('click', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    $(this).parent().siblings().removeClass('open');
                    $(this).parent().siblings().find('[data-toggle=dropdown]').parent().removeClass('open');
                    $(this).parent().toggleClass('open');
                });
            }
        };

        $(window).resize(function() {
            /* ---------------------------------------------- /*
             * Write article data with handlebars.js
            /* ---------------------------------------------- */
            var width = Math.max($(window).width(), window.innerWidth);
            hoverDropdown(width, mobileTest);
        });

        /* ---------------------------------------------- /*
         * Navbar collapse on click
        /* ---------------------------------------------- */
        $(document).on('click', '.navbar-collapse.in', function(e) {
            if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
                $(this).collapse('hide');
            }
        });
    });

})(jQuery);

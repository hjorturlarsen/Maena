$(function() {

    $(document).ready(function() {

        /* ---------------------------------------------- /*
         * Initialize some key variables
        /* ---------------------------------------------- */

        var navbar = $('.navbar-custom'),
            header1 = $('#header1'),
            header2 = $('#header2'),
            navHeight = navbar.height(),
            width = Math.max($(window).width(), window.innerWidth),
            mobileTest;

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            mobileTest = true;
        }

        $(".fancybox").fancybox({
                padding: 0,

                openEffect : 'elastic',
                openSpeed  : 150,

                closeEffect : 'elastic',
                closeSpeed  : 150,

                closeClick : true,

                helpers : {
                    overlay : {
                        css : {
                            'background' : 'rgba(0,0,0,0.85)'
                        }
                    }
                }
            });

        $(window).resize(function() {
            var width = Math.max($(window).width(), window.innerWidth);
            hoverDropdown(width, mobileTest);
        });


        /* ---------------------------------------------- /*
         * Get data from json file
        /* ---------------------------------------------- */

        function getData() {
            $.get('json/maena.json', function(data) {
                success: writeArticles(data).done(function() {
                    initFullpage();
                });
                writeMenu(data);
            });
        }

        /* ---------------------------------------------- /*
         * Write article data with handlebars.js
        /* ---------------------------------------------- */

        function writeArticles(data) {
            var source = $("#article_template").html();
            var template = Handlebars.compile(source);
            $("#fullpage").append(template(data));

            return $.ajax();
        }

        /* ---------------------------------------------- /*
         * Write the menu context with handlebars.js
        /* ---------------------------------------------- */

        function writeMenu(data) {
            var source = $('#menu_template').html();
            var template = Handlebars.compile(source);
            $('#menu_handlebars').append(template(data.menu_items));
        }

        /* ---------------------------------------------- /*
         * Initialize fullpage.js
        /* ---------------------------------------------- */

        function initFullpage() {
            $('#fullpage').fullpage({
                anchors: ['grein0', 'grein1', 'grein2', 'grein3', 'grein4', 'grein5', 'grein6', 'grein7', 'grein8', 'grein9', 'grein10', 'grein11', 'grein12', 'grein13', 'grein14', 'grein15', 'grein16', 'grein17', 'grein18', 'grein19', 'grein20', 'grein21', 'grein22', 'grein23', 'grein24'],

                //Scrolling
                css3: true,
                scrollingSpeed: 700,
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
                    if (index == 1 && direction == 'down') {
                        fixNavbar(true);
                    } else if (index == 2 && direction == 'up') {
                        fixNavbar(false);
                    }
                    updateHeader(nextIndex);
                },
                afterLoad: function(anchorLink, index) {},
                afterRender: function() {},
                afterResize: function() {},
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
            var title1 = $('#section' + index).find('.title1').text();
            var title2 = $('#section' + index).find('.title2').text();
            if (index == 10) {
                header1.css('font-size', '1.5em');
            } else {
                header1.css('font-size', '2em');
            }
            header1.text(title1);
            header2.text(title2);
        }


        /* ---------------------------------------------- /*
         * Fixed navbar animation on scroll
        /* ---------------------------------------------- */

        function fixNavbar(bool) {
            if (bool == true) {
                navbar.addClass('navbar-transparent');
            }
            if (bool == false) {
                navbar.removeClass('navbar-transparent');
            }
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

        /* ---------------------------------------------- /*
         * Navbar collapse on click
        /* ---------------------------------------------- */

        $(document).on('click', '.navbar-collapse.in', function(e) {
            if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
                $(this).collapse('hide');
            }
        });

        /* ---------------------------------------------- /*
         * Main function to keep track of function calling
        /* ---------------------------------------------- */

        function main() {
            getData();
        }
        main();
    });
});

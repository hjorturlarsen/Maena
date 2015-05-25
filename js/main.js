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
            mobileTest;

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

        if(mobileTest == true) {
            $('#tbl-section').css('display', 'none');
        }

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
                anchors: ['Efnisyfirlit', 'Inngangur', 'grein1', 'grein2', 'grein3', 'grein4', 'grein5', 'grein6', 'grein7', 'grein8', 'grein9', 'grein10', 'grein11', 'grein12', 'grein13', 'grein14', 'grein15', 'grein16', 'grein17', 'grein18', 'grein19', 'grein20', 'grein21', 'grein22', 'grein23', 'grein24', ],
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
                    hideOrShowNav(slideIndex);
                }
            });

            //Prevent user from scrolling from article to article
            //without going back to the images.
            $('.article').on('mousewheel touchmove', function(e) {
                e.preventDefault();
                //e.stopPropagation();
            });

            $('.article-icon').click(function() {
                $.fn.fullpage.moveSlideRight();
            });

            $('.content-icon').click(function() {
                $.fn.fullpage.moveSlideLeft();
            });
        }

        /* ---------------------------------------------- /*
         * Update header for table of contents
        /* ---------------------------------------------- */
        $(document).ajaxComplete(function() {
            var mainTitle = $('#main-title');
            $('img.circular-img').hover(function() {
                var iconHovered = $(this);
                var articleHovered = iconHovered.attr('id').replace('icon', '#section');
                $('#main-title').text(($(articleHovered).find('.title1').text()));
                if (iconHovered.attr('id') == "icon10") {
                    mainTitle.css('font-size', '2.5em');
                }
                else {
                    mainTitle.css('font-size', '4em');
                }
            },
            function() {
                mainTitle.text("Mæna");
                mainTitle.css('font-size', '4em');
            });
        });

        /* ---------------------------------------------- /*
         * Hide the navbar while inside an article
        /* ---------------------------------------------- */
        function hideOrShowNav(slideIndex) {
            if(slideIndex == 0) {
                navbar.hide();
            }
            else {
                navbar.show();
            }
        }

        /* ---------------------------------------------- /*
         * Update navbar according to article
        /* ---------------------------------------------- */
        function updateHeader(index) {
            index -= 2;
            var title1 = $('#section' + index).find('.title1').text();
            if (index < 0) {
                navbar.hide();
            } else {
                navbar.show();
            }
            if (index == 10) {
                header1.css('font-size', '1.5em');
            } else {
                header1.css('font-size', '2em');
            }
            header1.text(title1);
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
        }

        /* ---------------------------------------------- /*
         * Navbar collapse on click
        /* ---------------------------------------------- */
        $(document).on('click', '.navbar-collapse.in', function(e) {
            if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
                $(this).collapse('hide');
            }
        });

        $(window).resize(function() {
            var width = Math.max($(window).width(), window.innerWidth);
            hoverDropdown(width, mobileTest);
        });
    });

})(jQuery);

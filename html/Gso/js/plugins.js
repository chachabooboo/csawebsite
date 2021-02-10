// make it safe to use console.log always

$(document).ready(function () {
    $("#password-box").keyup(function () { run_password_analysis() });

    $("#search-box").keypress(function (e) {
        if (e.which == 13) {
            var field = $("#search-box").val();
            window.location.href = "/gosafeonline/search" + "?q=" + filterXSS(field).toLowerCase().replace(/alert/g, 'alerts');
            return false;
        }
    });

    $("#btn-search-box").click(function () {
        var field = $("#search-box").val();
        window.location.href = "/gosafeonline/search" + "?q=" + filterXSS(field).toLowerCase().replace(/alert/g, 'alerts');
        return false;
    });
});

(function (a) {
    function b() { }
    for (
        var c = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(
            ","
        ),
        d;
        !!(d = c.pop());

    ) {
        a[d] = a[d] || b;
    }
})(
    (function () {
        try {
            console.log();
            return window.console;
        } catch (a) {
            return (window.console = {});
        }
    })()
);

// main app
var PAEApp = PAEApp || {};

// Dark UI Interaction class
PAEApp.UIInteraction = function (customSetting) {
    // overwrite default settings
    var settings = $.extend({}, customSetting || {});

    // vars
    var self = this;

    // init
    this.init = function () {
        // initialize main nav dropdown
        initDropdownMenu();

        // on resize function
        $(window).resize(function () {
            initMobileMenuHeight();

            // initialize title height
            initTitleHeight();

            // normalize article img
            normalizeArticleImg();

            // Calculate object size
            calculateObjectSize();

            if ($(window).width() < 768) {
                initMobileMenu();
            } else {
                initDropdownMenu();
            }
            if ($(window).width() < 2000) {
                initBannerWidth();
            }

            initMaxHeightArticle();
        });

        // windowImageFixResize();

        // init carousel plugin at homepage
        initSlickHomepage();

        // init navigation menu of mobile version
        initMobileMenuHeight();

        // initialize mobile menu button
        initMobileMenu();

        // inititalize side menu dropdown
        initDropdownSideMenu();

        // initialize title height
        initTitleHeight();

        // inititalize text resizer
        initTextResizer();

        // initialize print
        initPrint();

        // init img responsive
        initImgResponsive();

        // breadcrumb image responsive
        // initImgCover();

        // initialize quiz
        //initQuiz();
        initBannerWidth();

        initMaxHeightArticle();
        // Calculate object size
        calculateObjectSize();

        // init search scroll GSE
        initGSEScrollTop();

        initMobileNavHidden();
    };

    // method to initialize quiz
    //var initQuiz = function() {
    //  // check
    //  if ($(".quiz").length) {
    //    var el = $(".quiz");

    //    el.on("click", ".btn-next", function(e) {
    //      e.preventDefault();
    //      e.stopPropagation();

    //      $(this)
    //        .closest(".quiz-page")
    //        .removeClass("active")
    //        .next()
    //        .addClass("active");
    //    });

    //    el.on("click", ".btn-prev", function(e) {
    //      e.preventDefault();
    //      e.stopPropagation();

    //      $(this)
    //        .closest(".quiz-page")
    //        .removeClass("active")
    //        .prev()
    //        .addClass("active");
    //    });
    //  }
    //};

    var initMobileNavHidden = function () {
        if ($(".footer-bot li.nav-link-mobile-version").length) {
            $(".footer-bot li.nav-link-mobile-version")
                .first()
                .prev()
                .addClass("nav-last-child");
        }
    };

    var initMaxHeightArticle = function () {
        if ($(".article-wrap").length) {
            // PC
            if (window.innerWidth > 1206) {
                // console.log(window.innerWidth);
                setTimeout(function () {
                    var hero = $(".article-hero").height();

                    $(".article-wrap article").height(hero);
                }, 250);
            } else {
                // console.log(window.innerWidth);
                setTimeout(function () {
                    $(".article-wrap article").height("100%");
                }, 250);
            }
        }
    };

    var initBannerWidth = function () {
        if ($(".main-top").length) {
            var maxWidth = $(window).width();
            if (maxWidth > 1200) {
                $(".main-top").css("max-width", maxWidth);
            } else {
                $(".main-top").css("max-width", "unset");
            }
        }
    };
    // method to set the height of article box in the hompage to match with the article hero picture
    // PC version only
    this.initArticleHeight = function () {
        // check if element present
        if ($(".article-wrap").length !== 0) {
            // PC
            if ($(window).width() > 1206) {
                var hero = $(".article-hero").outerHeight();

                $(".article-wrap article").height(hero);
            }
        }
    };

    // method to set the height of announcement box in the homepage to match witch the announcement banner image
    // PC version only
    this.initAnnouncementHeight = function (minwidth) {
        if (
            $(".announcement-banner").length !== 0 &&
            $(window).width() > minwidth
        ) {
            var banner = $(".announcement-banner").outerHeight();

            $(".announcement-grid").height(banner);
        }
    };

    // method to initialize carousel in homepage
    // dependency to slick.js
    var initSlickHomepage = function () {
        // check
        if ($(".slider").length !== 0) {
            $(".slider").on("init", function (event, slick) {
                normalizeArticleImg();
            });

            $(".slider").slick({
                centerMode: false,
                slideToShow: 1,
                slideToScroll: 1,
                arrows: true,
                autoplay: false,
                prevArrow: '<p class="prev"><</p>',
                nextArrow: '<p class="next">></p>',
                variableWidth: false,
                responsive: [
                    // {
                    // 	breakpoint:1206,
                    // 	settings: {
                    // 		'arrows': true,
                    // 		'dots' : false,
                    // 		'autoplay' : true,
                    // 		'centerMode': true,
                    // 		'slideToShow': 1,
                    // 		'slideToScroll': 1,
                    // 		'prevArrow'	: '<p class="prev"><</p>',
                    // 		'nextArrow'	: '<p class="next">></p>',
                    // 		'variableWidth': false
                    // 	}
                    // },
                    {
                        breakpoint: 767,
                        settings: {
                            arrows: false,
                            dots: true,
                            autoplay: true
                        }
                    }
                ]
            });
        }
    };

    // method for normalize article image
    var normalizeArticleImg = function () {
        if ($("article .article-big .article-cover img").length !== 0) {
            $("article .article-big .article-cover img").each(function () {
                $(this).css("display", "block");
            });
            setTimeout(function () {
                $("article .article-big .article-cover img").css(
                    "display",
                    "inline-block"
                );
            }, 100);
        }
    };

    // method to initialize mobile menu
    var initMobileMenu = function () {
        // init btn menu
        if ($(".btn-menu").is(":visible")) {
            // click
            $(".btn-menu").on("click", function (e) {
                // prevent
                e.preventDefault();

                // toggle class
                $("header").toggleClass("open");
                $("body").toggleClass("open");
            });
        }
    };

    // method to initialize general dropdown
    var initDropdownMenu = function () {
        // init dropdown
        // check
        if ($(".mainnav").length > 0) {
            // add class
            if ($(".mainnav li ul").length > 0) {
                $(".mainnav li ul")
                    .parent()
                    .addClass("dropdown");
            }

            // PC version
            if ($(window).width() > 1024) {
                // on hover
                $(".dropdown").hover(
                    function () {
                        $("ul", this)
                            .stop()
                            .slideDown(300);
                    },
                    function () {
                        $("ul", this)
                            .stop()
                            .slideUp(300);
                    }
                );

                // tablet and mobile
            } else {
                $(".dropdown > a").on("click", function (e) {
                    // prevend default
                    e.preventDefault();
                    e.stopPropagation();

                    var self = $(this).closest(".dropdown");

                    // if opened
                    if (
                        $(self)
                            .find("ul")
                            .is(":visible")
                    ) {
                        $(self).removeClass("active");
                        $(self)
                            .find("ul")
                            .slideUp(300);

                        // if closed
                    } else {
                        // reset
                        $(self)
                            .parent()
                            .find(".dropdown")
                            .removeClass("active");
                        $(self)
                            .parent()
                            .find(".dropdown ul")
                            .slideUp(300);

                        // dropdown
                        $(self)
                            .find("ul")
                            .slideDown(300);
                        $(self).addClass("active");
                    }
                });
            }
        }
    };

    // method to set the height of main navigation , so if the menu's height is longer than the window it will show the overflow
    var initMobileMenuHeight = function () {
        // mobile
        if ($(".btn-menu").is(":visible")) {
            var set = $(window).height() - $("header").height();
            $(".mainnav").height(set);
        } else {
            $(".mainnav").height("auto");
        }
    };

    // initialize selectpicker plugin
    // dependency selectpicker.js
    var initSelectPicker = function () {
        // if element exist
        if ($(".selectpicker").length !== 0) {
            $(".selectpicker").selectpicker();
        }
    };

    // method to make dropdown side navigation
    var initDropdownSideMenu = function () {
        // debug
        var debug = false;

        if ($(".side-nav").length !== 0) {
            // debuger
            debuger(debug, "initDropdownSideMenu");

            // add class
            if ($(".side-nav ul li ul").length > 0) {
                debuger(debug, "class dropdown added");

                $(".side-nav ul li ul")
                    .parent()
                    .addClass("dropdown");
            }

            $(".side-nav > ul > li.dropdown > a").on("click", function (event) {
                // debug click
                debuger(debug, "clicked");

                event.preventDefault();

                var self = this,
                    dropcontent = $(this)
                        .parent()
                        .find("ul");

                if ($(dropcontent).is(":visible")) {
                    debuger(debug, "visible");

                    $(this)
                        .parent()
                        .removeClass("active");

                    $(dropcontent).slideUp(300);
                } else {
                    debuger(debug, "not visible");

                    $(this)
                        .parent()
                        .addClass("active");

                    $(dropcontent).slideDown(300);
                }
            });
        }
    };

    // initialize title height
    var initTitleHeight = function () {
        // check if element exist
        if ($(".listing-article").length !== 0) {
            var temp = 0;

            // each
            $(".meta-title").each(function () {
                // variable height
                var title = $(this).height();

                if (title > temp) {
                    temp = title;
                }
            });

            // set the height
            $(".meta-title").each(function () {
                $(this).height(temp);
            });
        }

        // check if element exist
        if ($(".meta-description").length !== 0) {
            var temp = 0;

            // each
            $(".meta-description").each(function () {
                // variable height
                var title = $(this).outerHeight();

                if (title > temp) {
                    temp = title;
                }
            });

            // set the height
            $(".meta-description").each(function () {
                $(this).css("min-height", temp);
            });
        }
    };

    // method to init title height by ajax
    this.newInitTitleHeight = function () {
        initTitleHeight();
    };

    // method to initialize text resizer
    var initTextResizer = function () {
        // if element exist
        if ($(".resize").length !== 0) {
            // initializes
            $.rvFontsize({
                targetSection: ".resize p",
                store: false,
                controllers: {}
            });
        }
    };

    // Method for calculate youtube video size on desktop and mobile
    var calculateObjectSize = function () {
        $("object").each(function () {
            if (
                $(this)
                    .attr("data")
                    .indexOf("youtube")
            ) {
                if ($(window).width() < 769) {
                    $(this).attr("width", "100%");
                } else {
                    $(this).attr("width", "560px");
                }
            }
        });
    };

    // method to print
    var initPrint = function () {
        if ($(".print") !== 0) {
            $(".print").click(function () {
                window.print();
            });
        }
    };

    // method to initialize img responsive under main-content class
    var initImgResponsive = function () {
        if ($(".main-content img").length !== 0) {
            $(".main-content img").addClass("img-responsive");
        }
    };

    // method to help debug localy
    var debuger = function (debug, message) {
        if (debug) {
            console.log(message);
        }
    };
};

var initGSEScrollTop = function () {
    $(document).on("click", ".gsc-cursor-page", function () {
        $(".gsc-results-wrapper-overlay.gsc-results-wrapper-visible").scrollTop(0);
    });
};

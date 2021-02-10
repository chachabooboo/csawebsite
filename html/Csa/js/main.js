$(document).ready(function () {
    $(document).on(
        "click",
        ".job-listing-wrapper .paging-wrapper .paging-list .paging-item a",
        function () {
            $(window).scrollTop(0);
        }
    );

    if ($("li.nav-link-mobile-version").length) {
        $("li.nav-link-mobile-version")
            .first()
            .prev()
            .addClass("nav-last-child");
    }

    $("a[href*='/media/csa/']").each(function () {
        this.search = "";
    });
    var currentView;
    if ($(window).width() >= 768) {
        currentView = 1; //tablet desktop view
        $(".latest-articles").slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1
        });
        $(".slick-next").html("");
        $(".slick-prev").html("");
    } else {
        currentView = 2; //mobile view
    }

    // Youtube object
    calculateObjectSize();

    $(window).resize(function () {
        var windowWidth = $(window).width();
        if (windowWidth >= 768 && currentView == 2) {
            currentView = 1;
            $(".latest-articles").slick({
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1
            });
            $(".slick-next").html("");
            $(".slick-prev").html("");
            $(".mobile-header-nav").css("display", "none");
            $(".mobile-nav-wrapper").css("display", "none");
        } else if (windowWidth < 768 && currentView == 1) {
            currentView = 2;
            $(".latest-articles").slick("unslick");
        }

        // Youtube object
        calculateObjectSize();
    });

    $(".carousel-banner").slick({
        arrows: false,
        autoplay: true,
        autoplaySpeed: 10000
    });

    $("#prev_button").click(function () {
        $(".carousel-banner").slick("slickPrev");
    });

    $("#next_button").click(function () {
        $(".carousel-banner").slick("slickNext");
    });
	
    $(".scfSubmitButton").click(function () {
        document.getElementsByClassName("scfMultipleLineTextBox")[0].value = filterXSS(document.getElementsByClassName("scfMultipleLineTextBox")[0].value).toLowerCase().replace(/alert/g,'alerts');
        document.getElementsByClassName("scfSingleLineTextBox")[0].value = filterXSS(document.getElementsByClassName("scfSingleLineTextBox")[0].value).toLowerCase().replace(/alert/g,'alerts');
        document.getElementsByClassName("scfSingleLineTextBox")[1].value = filterXSS(document.getElementsByClassName("scfSingleLineTextBox")[1].value).toLowerCase().replace(/alert/g,'alerts');
    });

    $(".scfSubmitButton").keypress(function (e) {
        if (e.which == 13) {
            document.getElementsByClassName("scfMultipleLineTextBox")[0].value = filterXSS(document.getElementsByClassName("scfMultipleLineTextBox")[0].value).toLowerCase().replace(/alert/g,'alerts');
            document.getElementsByClassName("scfSingleLineTextBox")[0].value = filterXSS(document.getElementsByClassName("scfSingleLineTextBox")[0].value).toLowerCase().replace(/alert/g,'alerts');
            document.getElementsByClassName("scfSingleLineTextBox")[1].value = filterXSS(document.getElementsByClassName("scfSingleLineTextBox")[1].value).toLowerCase().replace(/alert/g,'alerts');
        }
    });

    $("#search_input").keypress(function (e) {
        if (e.which == 13) {
            var field = $("#search_input").val();
            window.location.href = "/content/searchresults" + "?q=" + filterXSS(field).toLowerCase().replace(/alert/g,'alerts');
            return false;
        }
    });

    $("#search-box").keypress(function (e) {
        if (e.which == 13) {
     		var field = $("#search-box").val();
            window.location.href = "/content/searchresults" + "?q=" + filterXSS(field).toLowerCase().replace(/alert/g,'alerts');
            return false;
        }
    });

    $("#btn-search-box").click(function () {
  		var field = $("#search-box").val();
        window.location.href = "/content/searchresults" + "?q=" + filterXSS(field).toLowerCase().replace(/alert/g,'alerts');
        return false;
    });

    $(".article-thumbnail").hover(
        function () {
            $(this)
                .find(".article-title")
                .slideToggle();
        },

        function () {
            $(this)
                .find(".article-title")
                .slideToggle();
        }
    );

    $("#menu-toggle, #menu-close-button, .mobile-nav-wrapper").click(function () {
        $(".mobile-nav-wrapper").toggle();
        $(".mobile-header-nav").toggle();
    });

    $("li.has-submenu").click(function () {
        var elem = $(this).find("ul");
        if (elem.css("display") == "none") {
            $(this).addClass("active");
        } else {
            $(this).removeClass("active");
        }
        elem.slideToggle(200, "swing");
    });

    $("li.has-dropdown").mouseenter(function () {
        $(this).addClass("active");
    });

    $("li.has-dropdown").mouseleave(function () {
        $(this).removeClass("active");
    });
    if ($(".RadDataPager").length) {
        var lastpagenumber = parseInt($(".rad-datalast").data("last"));
        var prevbutton = $(".RadDataPager .rdpWrap:first-of-type a:last-of-type");
        var nextbutton = $(".RadDataPager .rdpWrap:last-of-type a:first-of-type");

        if (
            $(".rdpCurrentPage")
                .children()
                .html() == "1"
        ) {
            prevbutton.css("display", "none");
        } else if (
            $(".rdpCurrentPage")
                .children()
                .html() == lastpagenumber
        ) {
            nextbutton.css("display", "none");
        }
    }
    $("#resizeTextSmaller").click(function () {
        var currentSize = jQuery("html").css("font-size");
        switch (parseInt(currentSize)) {
            case 20:
                jQuery("html").css("font-size", "19px");
                break;
            case 19:
                jQuery("html").css("font-size", "18px");
                break;
            case 18:
                jQuery("html").css("font-size", "17px");
                break;
            case 17:
                jQuery("html").css("font-size", "16px");
                break;
            case 16:
                jQuery("html").css("font-size", "15px");
                break;
            case 15:
                jQuery("html").css("font-size", "14px");
                break;
            case 14:
                jQuery("html").css("font-size", "13px");
                break;
            case 13:
                jQuery("html").css("font-size", "12px");
                break;
            case 12:
                jQuery("html").css("font-size", "11px");
                break;
            case 11:
                jQuery("html").css("font-size", "10px");
                break;
            case 10:
                jQuery("html").css("font-size", "9px");
                break;
            case 9:
                jQuery("html").css("font-size", "8px");
                break;
            case 8:
                jQuery("html").css("font-size", "7px");
                break;
            default:
                break;
        }
    });

    $("#resizeTextBigger").click(function () {
        var currentSize = jQuery("html").css("font-size");
        switch (parseInt(currentSize)) {
            case 19:
                jQuery("html").css("font-size", "20px");
                break;
            case 18:
                jQuery("html").css("font-size", "19px");
                break;
            case 17:
                jQuery("html").css("font-size", "18px");
                break;
            case 16:
                jQuery("html").css("font-size", "17px");
                break;
            case 15:
                jQuery("html").css("font-size", "16px");
                break;
            case 14:
                jQuery("html").css("font-size", "15px");
                break;
            case 13:
                jQuery("html").css("font-size", "14px");
                break;
            case 12:
                jQuery("html").css("font-size", "13px");
                break;
            case 11:
                jQuery("html").css("font-size", "12px");
                break;
            case 10:
                jQuery("html").css("font-size", "11px");
                break;
            case 9:
                jQuery("html").css("font-size", "10px");
                break;
            case 8:
                jQuery("html").css("font-size", "9px");
                break;
            case 7:
                jQuery("html").css("font-size", "8px");
                break;
            default:
                break;
        }
    });
	
    if (
        $("#success-redirect").length > 0 &&
        $("#success-redirect")
            .parent()
            .siblings(".scfForm")
            .children(".scfSubmitButtonBorder").length < 1
    ) {
        setTimeout(function () {
            location.href = location.href;
        }, 5000);
    }

    // Method for calculate youtube video size on desktop and mobile
    function calculateObjectSize() {
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
    }
});

$(document).on("click", ".gsc-cursor-page", function () {
    $(".gsc-results-wrapper-overlay.gsc-results-wrapper-visible").scrollTop(0);
});

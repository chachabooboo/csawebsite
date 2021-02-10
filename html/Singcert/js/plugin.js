

function formatArticleListingPagination() {
    if ($(".RadDataPager").length) {
        var firstpagebutton = $(
            ".RadDataPager .rdpWrap:first-of-type input:first-of-type"
        );
        var lastpagebutton = $(
            ".RadDataPager .rdpWrap:last-of-type input:last-of-type"
        );
        var lastpagenumber = $(".rad-datalast").data("last");
        var prevbutton = $(".RadDataPager .rdpWrap:first-of-type input:last-of-type");
        var nextbutton = $(".RadDataPager .rdpWrap:last-of-type input:first-of-type");

        firstpagebutton[0].value = 1;
        lastpagebutton[0].value = lastpagenumber;

        if (
            $(".rdpNumPart > a:first-of-type")
                .children()
                .html() == "1"
        ) {
            $(".rdpNumPart > a:first-of-type").css("display", "none");
        }
        if (
            $(".rdpNumPart > a:last-of-type")
                .children()
                .html() == lastpagenumber
        ) {
            $(".rdpNumPart > a:last-of-type").css("display", "none");
        }

        if (
            $(".rdpCurrentPage")
                .children()
                .html() == "1"
        ) {
            firstpagebutton[0].className += " rdpCurrentPage";
            prevbutton.css("display", "none");
        } else if (
            $(".rdpCurrentPage")
                .children()
                .html() == lastpagenumber
        ) {
            lastpagebutton[0].className += " rdpCurrentPage";
            nextbutton.css("display", "none");
        }
    }
}

function setValue(elementSubmit, elementInput) {
    elementSubmit.click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        const thisVal = elementInput.val();
        if (thisVal !== '') {
            window.location.href = "/singcert/content/search-results?q=" + filterXSS(thisVal).toLowerCase();
        }
    });

    elementInput.keypress(function (e) {
        if (e.which === 13) {
            e.preventDefault();
            e.stopPropagation();
            elementSubmit.trigger('click');
        }
    });
}

if ($('#sBtn1').length !== 0) {
    const btn = $('#sBtn1');
    const input = btn.parents('.sc-headsearch-wrap').find('.search-field');
    setValue(btn, input);
}

if ($('#sBtn2').length !== 0) {
    const btn = $('#sBtn2');
    const input = btn.parent().find('.search-field');
    setValue(btn, input);
}

$(document).ready(function () {
    formatArticleListingPagination();
});
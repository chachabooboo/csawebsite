function Prev() {
    slider.goToPrevSlide()
}
function unique(list) {
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}
var a = 1, b= 0, slider, count = 0, y = [];
$(document).ready(function() {
    $(".quiz_questions_title span").append($(".Yes").length);
    slider = $(".bxslider").bxSlider({
        speed:0,
        infiniteLoop: !0,
        pager: !1,
        onSliderLoad: function(){
            $('.bx-prev').addClass('disabled');
        },
        onSlideNext: function() {
            $('.bx-prev').removeClass('disabled');            
            a += 1, b += 1;
            if (a > '7') a = '7';
            $(".quiz_questions_title label").empty().append(a);
           if (b == '7' && count >= "4") document.location = "http://csa.localdev.info/sitecore/content/GoSafeOnline/Quiz/Tools/Level 2"; else if (b == '7' && count < "4") document.location = "http://csa.localdev.info/sitecore/content/GoSafeOnline/Quiz/Tools/Level 1";
        },
        onSlidePrev: function() {
            a -= 1, $(".quiz_questions_title label").empty().append(a);
            if ( a == 1)  $('.bx-prev').addClass('disabled');
        }
    })
}), $(document).on("click", ".Yes, .No", function() {
    var e = $(this).attr("class");
    if ("No" !== e){
        y.push($("." + e).index(this));

    }
    count = unique(y).length;
    console.log(y);
    console.log(count);
    if ($("." + e).index(this) != $("." + e).length - 2){
    slider.goToNextSlide();
    }
    count >= "4" && $("." + e).index(this) == $("." + e).length - 2 ? document.location = "http://csa.localdev.info/sitecore/content/GoSafeOnline/Quiz/Tools/Level 2" : "4" >= count && $("." + e).index(this) == $("." + e).length - 2 && (document.location("http://csa.localdev.info/sitecore/content/GoSafeOnline/Quiz/Tools/Level 1"))
});
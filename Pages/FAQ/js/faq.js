$(document).ready(function(){		
    faqListToggle01(); //slideDown FAQ(아코디언 형식 아님)
    function faqListToggle01() {
        $(".b-title-box").find("a").click(function () {
            if ($(this).parents("li").find(".b-ans-box").is(":hidden")) {
                $(this).parents("li").find(".b-ans-box").slideDown(100);
                $(this).parents(".b-quest-box").addClass("faq-close");
            } else if ($(this).parents("li").find(".b-ans-box").is(":visible")) {
                $(this).parents("li").find(".b-ans-box").slideUp(100);
                $(this).parents(".b-quest-box").removeClass("faq-close");
            }
        });
    }
});
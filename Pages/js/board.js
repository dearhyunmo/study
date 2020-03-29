// 실행문은 최상단 $(document).ready(); 구문안에 넣어주세요.
$(document).ready(function () {
    //select box
    $box = $(".b-sel-title");
    $box.click(function () {
        $(this).next().toggleClass('on');
    });

    faqListToggle01(); //slideDown FAQ(아코디언 형식 아님)
    function faqListToggle01() {
        $(".bn-list-faq01 .b-title-box").find("a").click(function () {
            if ($(this).parents("li").find(".b-ans-box").is(":hidden")) {
                $(this).parents("li").find(".b-ans-box").slideDown(100);
                $(this).parents(".b-quest-box").addClass("faq-close");
            } else if ($(this).parents("li").find(".b-ans-box").is(":visible")) {
                $(this).parents("li").find(".b-ans-box").slideUp(100);
                $(this).parents(".b-quest-box").removeClass("faq-close");
            }
        });

    }

    faqListToggle02(); //show, hide FAQ(아코디언 형식)
    function faqListToggle02() {
        $(".bn-list-faq02 .b-title-box").find("a").click(function () {
            if ($(this).parents(".b-quest-box").next(".b-ans-box").is(":hidden")) {
                $(".bn-list-faq02").find(".b-ans-box").hide();
                $(this).parents(".b-quest-box").next(".b-ans-box").show();
                $(".b-quest-box").removeClass("active");
                $(this).parents(".b-quest-box").addClass("active");
            } else if ($(this).parents(".b-quest-box").next(".b-ans-box").is(":visible")) {
                $(this).parents(".b-quest-box").next(".b-ans-box").hide();
                $(this).parents(".b-quest-box").removeClass("active");
            }

        });
    }
  
    //========================
    //실행 오브젝트 목록
    //========================
    App.BoardCommon.init();
    App.BoardSelectBox.init();
    App.SelectBoxMenu.init();
    
    //카드형 이미지 게시판(img01 type02) object-fit : IE대응
    var bnImg01Type02 = new App.ObjectFit();
    bnImg01Type02.init(".bn-list-img01.type02 .b-box01 .b-img-box a");
  
    //인물소개 리스트01(type01, type02, type03) object-fit : IE대응
    var bnPerson01Type01 = new App.ObjectFit();
    bnPerson01Type01.init(".bn-list-person01.type01 .b-wrap > div > div .b-img-box");

    var bnPerson01Type02 = new App.ObjectFit();
    bnPerson01Type02.init(".bn-list-person01.type02 .b-wrap > div > div .b-img-box");

    var bnPerson01Type03 = new App.ObjectFit();
    bnPerson01Type03.init(".bn-list-person01.type03 .b-wrap > div > div .b-img-box");

    //인물소개 리스트02(type01, type02, type03) object-fit : IE대응
    var bnImg02Type01 = new App.ObjectFit();
    bnImg02Type01.init(".bn-list-person02.type01 .b-wrap > div > div .b-person-box .b-img-box");

    var bnImg02Type02 = new App.ObjectFit();
    bnImg02Type02.init(".bn-list-person02.type02 .b-wrap > div > div .b-person-box .b-img-box");

    var bnImg02Type03 = new App.ObjectFit();
    bnImg02Type03.init(".bn-list-person02.type03 .b-wrap > div > div .b-person-box .b-img-box");
});


//==================================================
//Board Common
//==================================================
App.BoardCommon = function () {
    var self;
    return {
        init: function () {
            self = this;

            //게시판 view 모바일 옵션버튼
            $(".b-opt-btn").click(function () {
                $(this).next(".b-opt-box").toggle();
            });

            //인물소개 팝업
            $(".bn-list-person02 .b-person-box").click(function () {
                $(".bn-list-person02 .b-pop-wrap").fadeIn();
                $(".bn-list-person02 .b-pop-bg").fadeIn();
                $("body").css({overflow: "hidden"});
                $(".bn-list-person02 .b-pop-wrap > div > div > div:nth-of-type(2), .bn-list-person02 .b-pop-wrap > div > div").scrollTop("0");
            });

            $(".bn-list-person02 .b-pop-wrap .b-close").click(function () {
                $(".bn-list-person02 .b-pop-wrap").fadeOut();
                $(".bn-list-person02 .b-pop-bg").fadeOut();
                $("body").css({overflow: "auto"});
            });
            
            $(".bn-list-person02 .b-modify").click(function(e){
                e.stopPropagation();
            });
        }
    }
}();

//===================================================
//Board SelectBox
//===================================================
App.BoardSelectBox = function () {
    var self;
    var $box;
    return {
        init: function () {
            self = this;
            $box = $(".b-sel-box");

            $box.each(function () {
                var $thisBox = $(this);
                $thisBox.click(self.onClick);

                $(document).mouseup(function (e) {
                    if ($thisBox.has(e.target).length === 0) {
                        $thisBox.removeClass("close");
                    }
                });
            });

        },
        onClick: function () {
            if ($(this).find("ul").is(":hidden")) {
                $(this).addClass("close");
            } else if ($(this).find("ul").is(":visible")) {
                $(this).removeClass("close");
            }

            $(this).mouseleave(function () {
                $(this).removeClass("close");
            });
        }
    }
}();

//------------------------------------------------------
//Board select box
//------------------------------------------------------
App.SelectBoxMenu = function () {
    var self;
    var $tabSel, $mTab;
    return {
        init: function () {
            self = this;
            $tabSel = $('.sel-category');
            $mTab = $(".b-category01-m");
          
            var select_name = $('.sel-category').children('option:selected').text();
            $('.sel-category').siblings('label').text(select_name);
          
            $tabSel.on('change', function () {
                var url = $(this).val();
                if (url) {
                    window.location = url; // redirect
                }
              
                return false;
            });
          
            $mTab.click(self.onClick);
        },
        onClick: function(){
         $mTab.toggleClass("active");
          $(".sel-category").blur(function(){
            $mTab.removeClass("active");
          });
        }
    }
}();

//------------------------------------------------------
//object-fit(IE)
//------------------------------------------------------  
App.ObjectFit = function(){
  var self;
  return {
    init: function(param){
        if('objectFit' in document.documentElement.style === false) {
          var container = document.querySelectorAll(param);
          for(var i = 0; i < container.length; i++) {
            var imageSource = container[i].querySelector('img').src;
            container[i].querySelector('img').style.display = 'none';
            container[i].style.backgroundSize = 'cover';
            container[i].style.backgroundImage = 'url(' + imageSource + ')';
            container[i].style.backgroundPosition = '50% 0';
          }
        }
    }
  }
};

require("../../bower_components/zepto/zepto.js");
require("../../bower_components/zeptojs/src/touch.js");
require("../../bower_components/velocity/velocity.min.js");
require("../../bower_components/swiper/dist/js/swiper.min.js");
require("../js/share.min.js");

window.onload = function(){

    w = $(window).width();
    h = $(window).height();
    $(document).on("touchmove",function(){
        return false;
    });
    on = false;
    $("#audio").attr({"src":"/static/image/background.mp3"});
    $("#audio")[0].play();
    $(".music").on("click",function(){
        if(on) {
            on = false;
            document.getElementById("audio").pause();
            $(".music").removeClass("music-play");
        }   
        else {
            on = true;
            document.getElementById("audio").play();
            $(".music").addClass("music-play");
        }
    });
    $(".share-btn").on('tap',function(){
        $(".share").velocity("fadeIn");
    });
    $(".share").on('tap',function(){
        $(".share").velocity("fadeOut");
    });
    var pid=1;
    var answer = [2,1,1,3,3,2,3,3];
    right = 0;
    var showResult = function(per) {
        ans = 8 - per;
        $(".question").velocity("fadeOut");
        if(ans <= 3) {
            $(".result1").velocity("fadeIn");
        }
        else if(per>3&&per<=6) {
            $(".result2").velocity("fadeIn");
            $(".result2 .dialog").velocity("fadeIn");
        }
        else {
            $(".result3").velocity("fadeIn");
        }
    };
    $(".ticket-btn").on("tap",function(){
        location.href = 'http://mp.weixin.qq.com/s?__biz=MzA3NTc2NjQ4OQ==&mid=401510081&idx=1&sn=6a8e2a0ab73e99c1203d60b066c5a9ef&scene=0#wechat_redirect';
    });
    var bindAns = function(i) {
        $(".answer"+i).on("tap",function(){
            if(i == answer[pid-1]) {
                right ++;
            }
            console.log(i + " " + answer[pid-1]);
            console.log(right);
            pid ++;
            showQuestion(pid);
            if(pid == 9) {
                showResult(right);
            }
        });
    };
    var initQuestion = function() {
        for(i=1;i<=3;i++) {
            console.log(i);
            bindAns(i);
        }
    };
    var showQuestion = function(pid) {
        $(".question .bottom .title").css("background-image","url('/static/image/q"+pid+"-title.png')");  
        $(".question .bottom .answer1").css("background-image","url('/static/image/q"+pid+"-a.png')");  
        $(".question .bottom .answer2").css("background-image","url('/static/image/q"+pid+"-b.png')");  
        $(".question .bottom .answer3").css("background-image","url('/static/image/q"+pid+"-c.png')");  
    };
    $(".go-answer").on("tap",function(){
        $(".swiper-container").velocity("fadeOut");
        $(".question").velocity("fadeIn");
        pid = 1;
        initQuestion();
        showQuestion(pid);
    });
    var swiper = new Swiper('.swiper-container', {
        direction:'vertical',
        speed:500,
        onInit: function() {
        },
        onSlideChangeEnd: function(swiper){
            if(swiper.activeIndex == 0) {
            }
            else if(swiper.activeIndex == 1) {
                $(".page2 .title").velocity("fadeIn");
            }
        }
    });
}

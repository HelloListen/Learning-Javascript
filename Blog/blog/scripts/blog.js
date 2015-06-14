/**
 * Created by listen on 2015/6/14.
 * My site listenzhangbin.com
 */
$(function(){
    $(window).scroll(function(){
        var top=$("html").scrollTop()||$("body").scrollTop();
        if(top<100){
            $(".back").css({"display":"none"});
        }else{
            $(".back").css({"display":"block"});
        }
    })
    $(".back").bind("click",function(){
        $("html,body").animate({scrollTop:"0"},500);
    })
})
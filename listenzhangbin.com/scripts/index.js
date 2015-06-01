$(function(){
    var top=($(window).height()-$(".welcome").height())/2;
    setTimeout(function(){
        $("canvas").fadeTo(1000,0,function(){
            $(".welcome").fadeTo(1000,1,function(){}).animate({"top":top+"px"},1000);
        });
    },10000)
})
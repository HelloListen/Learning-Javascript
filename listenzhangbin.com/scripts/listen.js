$(function(){
    var left=($(window).width()-$("div.photo").width())/2;
    var top=($(window).height()-$("div.photo").height()-100)/2;
    $("div.photo").fadeTo(1500,1,function(){
        $("div.photo").animate({"top":top+"px"},1000)
    })
    $("div.title").fadeTo(1500,1,function(){
        $("div.title").animate({"top":(top*3)+"px"},1000)
    })

})

$(function(){
    $("#container").fullpage({
        sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90','#aee2d9'],
        navigation:true
    });
})

$(function(){
    var left=($(window).width()-$("div.photo").width())/2;
    var top=($(window).height()-$("div.photo").height()-100)/2;
    $("div.photo").css({"left":left+"px","top":top+100+"px"});
    $("div.photo").fadeTo(1500,1,function(){
        $("div.photo").animate({"top":top-50+"px"},1000)
    })
    $("div.title").fadeTo(1500,1,function(){
        $("div.title").animate({"top":(top*2.8)+"px"},1000)
    })
})


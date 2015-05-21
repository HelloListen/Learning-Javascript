
$(function(){
    $("#container").fullpage({
        sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#B0C4DE','#aee2d9'],
        navigation:true
    });
})

function addSpotlight(){
    $("div#navbar-collapse-main ul li").each(function(){
        $(this).click(function(){
            $("div#navbar-collapse-main ul li").removeClass("spotlight");
            $(this).addClass("spotlight");
        })
    })
}
$(function(){
    addSpotlight();
})

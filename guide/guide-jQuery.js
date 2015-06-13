/**
 * Created by listen on 2015/6/13.
 * My site listenzhangbin.com
 */
$(function(){
    var res=document.cookie.substring(9);
    if(res!=="www.listenzhangbin.com"){
        $("#mask,#searchTip,.stepA").css({"display":"block"});
        $("a").each(function(index){
            $(this).bind("click",function(){
                if(index<$("a").length-1){
                    $("#searchTip div").eq(index).css({"display":"none"});
                    $("#searchTip div").eq(index+1).css({"display":"block"});
                }else{
                    $("#mask,#searchTip,.stepA").css({"display":"none"});
                }
            })
        })

        $("span").each(function(index){
            $(this).click(function(){
                $("#mask,#searchTip,.stepA").css({"display":"none"});
            })
        })

        var d=new Date();
        d.setDate(d.getDate()+30);
        document.cookie="username=www.listenzhangbin.com;expires="+d;
    }

})

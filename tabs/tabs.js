/**
 * Created by listen on 2015/6/13.
 * My site listenzhangbin.com
 */
window.onload=function(){
    var container=document.getElementById("container");
    var div=container.getElementsByTagName("div");
    var li=document.getElementsByTagName("li");
    var timer;
    var index=0;
    function changeOpt(id){
            for(var j=0;j<li.length;j++){
                li[j].className="";
                div[j].className="content";
            }
            li[id].className="active";
            div[id].className="content spotlight";
            index=id;
    }
    function autoplay(){
        if(timer){
            clearInterval(timer);
            timer=null;
        }
        timer=setInterval(function(){
            index++;
            if(index>=li.length){
                index=0;
            }
            changeOpt(index);
        },2000)
        for(var i=0;i<li.length;i++){
            li[i].index=i;
            li[i].onmouseover=function(){
                clearInterval(timer);
                changeOpt(this.index);
            }
            li[i].onmouseout=function(){
                autoplay();
            }
        }
    }
    autoplay();
}
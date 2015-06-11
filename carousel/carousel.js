/**
 * Created by listen on 2015/6/11.
 * My site listenzhangbin.com
 */
window.onload=function(){
    var container=document.getElementById("container");
    var next=document.getElementById("next");
    var prev=document.getElementById("prev");
    var ul=document.getElementById("content");
    var ol=document.getElementById("count");
    var lis=ol.getElementsByTagName("li");
    var index=0;
    var timer;
    var animated=false;
    container.onmouseover=function(){
        next.style.display="block";
        prev.style.display="block";
        stop();
    }
    container.onmouseout=function(){
        next.style.display="none";
        prev.style.display="none";
        play();
    }

    function showBtn(){
        for(var i=0;i<lis.length;i++){
                if(lis[i].className=="spotlight"){
                    lis[i].className="";
                }
            }
        lis[index].className="spotlight";
        }

    function animate(offset){
        if(offset==0){
            return false;
        }
        animated=true;
        var time=300;
        var interval=10;
        var speed=offset/(time/interval);
        var newLeft=parseInt(ul.style.left)+offset;
        function go(){
            if((speed<0&&parseInt(ul.style.left)>newLeft)||(speed>0&&parseInt(ul.style.left)<newLeft)){
                ul.style.left=parseInt(ul.style.left)+speed+"px";
                setTimeout(go,interval);
            }else{
                ul.style.left=newLeft+"px";
                if(newLeft>-1000){
                    ul.style.left=-4000+"px";
                }
                if(newLeft<-4000){
                    ul.style.left=-1000+"px";
                }
                animated=false;
            }
        }
        go();
    }

    next.onclick=function(){
        if(animated){
            return false;
        }
        index++;
        if(index>3){
            index=0;
        }

        showBtn();
        animate(-1000);
    }
    prev.onclick=function(){
        if(animated){
            return false;
        }
        if(index==0){
            index=3;
        }else{
            index--;
        }

        showBtn();
        animate(1000);
    }

    for (var i = 0; i < lis.length; i++) {
        lis[i].onclick = function () {
            if (animated) {
               return;
            }
            if(this.className == 'spotlight') {
                return;
            }
            var myIndex = parseInt(this.getAttribute('data-index'));
            console.log(lis);
            var offset = -1000 * (myIndex - index);

            animate(offset);
            index = myIndex;
            showBtn();
        }
    }

    function play(){
        timer=setTimeout(function(){
            next.onclick();
           play();
        },3000)
    }
    play();
    function stop(){
        clearTimeout(timer);
    }
}
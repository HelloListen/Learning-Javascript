/**
 * Created by listen on 2015/6/12.
 * My site listenzhangbin.com
 */
window.onload=function(){
    var mask=document.getElementById("mask");
    var search=document.getElementById("searchTip");
    var step=search.getElementsByTagName("div");
    var a=search.getElementsByTagName("a");
    var close=search.getElementsByTagName("span");
    //∂¡»°cookie
    var res=document.cookie.substring(9);
    console.log(res);

    //≈–∂œ «∑Ò”–cookie
    if(res!="www.listenzhangbin.com"){
        mask.style.display=search.style.display=step[0].style.display="block";

        for(var i=0;i< a.length;i++){
            a[i].index=i;
            a[i].onclick=function(){
                this.parentNode.style.display="none";
                if(this.index<a.length-1){
                    step[this.index+1].style.display="block";
                }else if(this.index== a.length-1){
                    mask.style.display=search.style.display=step[0].style.display="none";
                }
            }
        }

        for(var i=0;i<close.length;i++){
            close[i].onclick=function(){
                mask.style.display=search.style.display=step[0].style.display="none";
            }
        }
        var d=new Date();
        d.setDate(d.getDate()+30);
        document.cookie="username=www.listenzhangbin.com;expires="+d;
    }

}
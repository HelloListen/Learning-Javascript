function addLoadEvent(_func){
    var oldonload=window.onload;
    if(typeof oldonload!="function"){
        window.onload=_func;
    }else{
        window.onload=function(){
            oldonload();
            _func();
        }
    }
}
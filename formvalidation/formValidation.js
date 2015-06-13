
window.onload = function () {

    var feedback= document.getElementsByTagName("span");
    var pwd = document.getElementById("pwd");
    var username=document.getElementById("username");
    var email=document.getElementById("email");
    function deleteSpace(_value) {
        var pattern = /^\s*(.+?)?\s*$/g;
        _value = _value.replace(pattern, "$1");
        return _value;
    }
    function reset(element,index){
        element.style.boxShadow="";
        feedback[index].innerHTML="";
    }
    function style(element,index,color,text){
        feedback[index].innerHTML=text;
        feedback[index].style.fontSize="14px";
        feedback[index].style.color=color;
        element.style.boxShadow="0 0 5px red";
    }
    function pwdStyle(index,color,text){
        feedback[index].innerHTML=text;
        feedback[index].style.fontSize="14px";
        feedback[index].style.color=color;
    }
    var pattern=/^[a-zA-Z0-9]+([\._-][a-zA-Z0-9]+)?@[a-zA-Z0-9]+([\._-][a-zA-Z0-9]+)?\.[a-z]{2,4}(\.[a-z]{2,4})?$/i;
    email.onblur=function(){
        if(email.value.length==0){
            style(email,2,"red");
            feedback[2].innerHTML="E-mail不得为空";
            return false;
        }
        if(!pattern.test(email.value)){
            style(email,2,"red","E-mail格式不正确");
        }
    }
    username.onblur=function(){
        if(username.value.length==0){
            style(username,0,"red","用户名不得为空");
        }
    }
    username.onfocus=function(){
        reset(username,0);
        return false;
    }
    pwd.onfocus=function(){
        reset(pwd,1);
        return false;
    }
    email.onfocus=function(){
        reset(email,2);
        return false;
    }

    pwd.onblur = function () {
        var errorNum = 0;
        if (deleteSpace(pwd.value).length < 3 || deleteSpace(pwd.value).length > 12) {
            style(pwd,1,"red","密码长度须在3-12位间");
            return false;
        }else{
            feedback[1].innerHTML="";
        }
        if (/\s/.test(deleteSpace(pwd.value))) {
            style(pwd,1,"red","密码有空格");
            return false;
        }
        if (!/[a-z]/.test(deleteSpace(pwd.value))) {
            errorNum++;
        }
        if (!/\d/.test(deleteSpace(pwd.value))) {
            errorNum++;
        }
        if (!/[A-Z]/.test(deleteSpace(pwd.value))) {
            errorNum++;
        }
        if (!/\W/.test(deleteSpace(pwd.value))) {
            errorNum++;
        }
        if (errorNum == 4) {
            feedback[1].innerHTML = "密码必须包含大写字母或小写字母或数字";
            style(pwd,1,"red");
        } else if (errorNum == 3) {
            pwdStyle(1,"orange","密码强度弱");
        } else if (errorNum == 2) {
            pwdStyle(1,"green","密码强度中");
        } else if (errorNum == 1) {
            pwdStyle(1,"green","密码强度较强");
        } else if (errorNum == 0) {
            pwdStyle(1,"green","密码强度强");
        }
    }
}
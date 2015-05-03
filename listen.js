/**
 * 改变元素的属性
 * @param {Object} _element:元素
 * @param {String} _attr：属性
 */
function changeAttr(_element, _attr) {
    var result = window.prompt("请输入一个css样式");
    _element.style[_attr] = result;
}

/**
 * 数字小于10，前面加0
 * @param {Number} _number:传进来的数字
 */
function addZero(_number) {
    if (_number > 10) {
        _number = _number + "";
    } else {
        _number = "0" + _number;
    }
    return _number;
}

/**
 *获取窗口的尺寸
 * @return {object}
 */
function getWindowSize() {
    return {
        width: document.documentElement.clientWidth || window.innerWidth,
        height: document.documentElement.clientHeight || window.innerHeight
    }
}

/**
 *获取滚动条的尺寸
 * @return {object}
 */
function getScrollSize() {
    return {
        top: document.documentElement.scrollTop || document.documentElement.scrollTop,
        left: document.documentElement.scrollLeft || document.documentElement.scrollLeft
    }
}

/**
 *根据类名称选择元素
 * @para {object}:元素
 * @para {string}:类名称
 * @return {object}
 */
function getElementsByClassName(_element, _classname) {
    var arr = [];
    for (i = 0; i < _element.length; i++) {
        if (_element[i].className == _classname) {
            arr.push(_element[i]);
        } else {
            continue;
        }
    }
    return arr;
}

/**
 * 可以多次调用的window.onload函数
 * @param {Object} _func：要加载的函数
 */
function addLoadEvent(_func) {
    var oldonload = window.onload;
    if (typeof window.onload != "function") {
        window.onload = _func;
    } else {
        window.onload = function () {
            oldonload();
            _func();
        }
    }
}

/**
 * 在后面插入元素
 * @param _newElement
 * @param _targetElement
 */
function insertAfter(_newElement, _targetElement) {
    var parent = _targetElement.parentNode;
    if (parent.lastChild == _targetElement) {
        parent.appendChild(_newElement);
    } else {
        parent.insertBefore(_newElement, _targetElement.nextSibling);
    }
}

/**
 * 跨浏览器绑定事件
 * @para {Object} _element:元素
 * @para {String} _type:事件类型
 * @para {Object} _fn:事件句柄/回调函数
 */
function addEventListener(_element, _type, _fn) {
    if (typeof _element.addEventListener == "undefined") {
        _element.attachEvent("on" + _type, _fn);
    } else {
        _element.addEventListener(_type, _fn);
    }
}

/**
 * 跨浏览器解除绑定事件
 * @para {Object} _element:元素/移除的元素
 * @para {String} _type:事件类型
 * @para {Object} _fn:事件句柄/回调函数
 */
function removeEventListener(_element, _type, _fn) {
    if (typeof _element.addEventListener == "undefined") {
        _element.detachEvent("on" + _type, _fn);
    } else {
        _element.removeEventListener(_type, _fn);
    }
}

/**
 * 跨浏览器阻止默认动作
 * @para {Object} _evt:事件对象
 */
function preventDefault(_evt) {
    //ie
    if (window.event) {
        _evt = window.event;
        _evt.returnValue = false;
    } else {
        _evt.preventDefault();
    }
}

/**
 * 跨浏览器的阻止冒泡
 * @para {Object} _evt:事件对象
 */
function stopPropagation(_evt){
    if(window.event){
        _evt=window.event;
        _evt.cancelBubble=true;
    }else{
        _evt.stopPropagation();
    }
}

/**
 * 跨浏览器获取选中的文本
 */
function getSelectionText(){
    var txt=null;
    //ff
    if(window.getSelection){
        txt=window.getSelection();
        //other
    }else if(document.getSelection){
        txt=document.getSelection();
        //ie
    }else if(document.selection){
        txt=document.selection.createRange().text;
    }
    return txt;
}

/**
 * 动画函数
 * @para {Object} _element:要做动画的元素
 * @para {String} _attr:要调整的元素属性
 * @para {Number} _alter:变化的值
 * @para {Number} _start:起始值
 * @para {Number} _dur:动画持续时间
 * @para {Object} _type:运动类型
 */
function animate(_element, _attr, _alter, _start, _dur, _type) {
    var curTime = 0;
    var timer = setInterval(function() {
        if (curTime == _dur) {
            clearInterval(timer);
        }
        _element.style[_attr] = _type(_start, _alter, curTime, _dur) + "px";
        curTime += 50;
    }, 50)
}

/**
 * 加速动画
 * @para {Number} _start:起始值
 * @para {Number} _alter:变化值
 * @para {Number} _curTime:当前帧
 * @para {Number} _dur:动画持续时间
 */
function Accelerate(_start, _alter, _curTime, _dur) {
    return _start + Math.pow(_curTime / _dur, 2) * _alter;
}

/**
 * 匀速动画
 * @para {Number} _start:起始值
 * @para {Number} _alter:变化值
 * @para {Number} _curTime:当前帧
 * @para {Number} _dur:动画持续时间
 */
function Line(_start, _alter, _curTime, _dur) {
    return _start + _curTime / _dur * _alter;
}
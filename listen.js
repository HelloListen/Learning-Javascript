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
		width : document.documentElement.clientWidth || window.innerWidth,
		height : document.documentElement.clientHeight || window.innerHeight
	}
}

/**
 *获取滚动条的尺寸
 * @return {object}
 */
function getScrollSize() {
	return {
		top : document.documentElement.scrollTop || document.documentElement.scrollTop,
		left : document.documentElement.scrollLeft || document.documentElement.scrollLeft
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
	for ( i = 0; i < _element.length; i++) {
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
function addLoadEvent(_func){
	var oldonload=window.onload;
	if(typeof window.onload!="function"){
		window.onload=_func;
	}else{
		window.onload=function(){
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
function insertAfter(_newElement,_targetElement){
    var parent=_targetElement.parentNode;
    if(parent.lastChild==_targetElement){
        parent.appendChild(_newElement);
    }else{
        parent.insertBefore(_newElement,_targetElement.nextSibling);
    }
}
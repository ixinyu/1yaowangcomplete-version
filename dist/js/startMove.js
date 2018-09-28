
function startMove(obj, json, fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var flag = true; //假设所有属性都达到目标值
		for(var attr in json) {
			var iTarget = json[attr];
			if(attr == "opacity"){
				var iCur = parseInt(getStyle(obj, attr)*100);
			}else{
				var iCur = parseInt(getStyle(obj, attr));
			}
			
			var iSpeed = (iTarget - iCur) / 7;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			
			if(attr == "opacity"){
				obj.style.opacity = (iCur + iSpeed)/100;
				obj.style.filter = "alpha(opacity="+(iCur + iSpeed)+")";	
			}else{
				obj.style[attr] = iCur + iSpeed + "px";
			}
			
			
			//只要有一个达到目标值，定时器就会被清除,会导致部分属性没有达到目标值
			//所有属性都达到目标值时，清除定时器
			if(iCur != iTarget) { //假设是否成立由此判断
				flag = false;
			}
		}

		if(flag) { //如果假设成立，清除定时器
			clearInterval(obj.timer);
			if(fn) {
				fn();
			}
		}

	}, 20)
}

function getStyle(obj, attr) {
	if(obj.currentStyle) {
		return obj.currentStyle[attr];
	}
	return getComputedStyle(obj, null)[attr];
}
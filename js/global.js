window.onload = function() {
	var ava = document.getElementsByClassName('avatar')[0];
	var img = document.getElementsByClassName('ava-img')[0];
	var zz1 = document.getElementsByClassName('zz1')[0];
	var zz2 = document.getElementsByClassName('zz2')[0];
	var height = document.documentElement.clientHeight;
	var width = document.documentElement.clientWidth/2;
	zz1.style.left = 0;
	zz1.style.height = height + 'px';
	zz2.style.right = 0;
	zz2.style.height = height + 'px';
	
	ava.onclick = function() {
		startMove(zz1, {
			'left': -width,
		}, 15, function() {
			zz1.remove();
		});
		startMove(zz2, {
			'right': -width,
		}, 15, function() {
			zz2.remove();
		});
		startMove(this, {
			'opacity': 100,
			'left': 250,
			'top': 100,
			'width': 400,
			'height': 400
		}, 20, function() {
			startMove(ava, {
				'left': 50,
				'top': 50,
				'width': 100,
				'height': 100
			}, 5)
		});
	};
	
//	ava.onmouseover = function() {
//		startMove(this, {
//			'opacity': 100
//		})
//	};
//	
//	ava.onmouseout = function() {
//		startMove(this, {
//			'opacity': 70
//		})
//	};
}

function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

function startMove(obj, json, spd, fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		for (var attr in json) {
			var flag = true;
			var icur = 0;
			//判断是opacity或者其他,icur是现值
			if (attr == "opacity") {
				icur = Math.round(parseFloat(getStyle(obj, attr))*100);
			} else {
				icur = parseInt(getStyle(obj, attr));
			}
			//速度
			var speed = ( json[attr] - icur)/spd;
			speed = speed > 0 ? Math.ceil(speed): Math.floor(speed);
			//运动
			if (icur !=  json[attr]) {
				flag = false;
			} 
			if (attr == "opacity") {
				obj.style.filter = "alpha(opacity:" +(icur + speed )+ ")";
				obj.style[attr] = (icur + speed)/100;
			} else {
				obj.style[attr] = icur + speed + "px";
			}
		} 
		if (flag) {
			clearInterval(obj.timer);
			if (fn) {
				fn();
			}
		}
	}
	, 30);
}
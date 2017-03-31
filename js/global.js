window.onload = function() {
	var ava = document.getElementsByClassName('ava-float')[0];
	var img = document.getElementsByClassName('ava-img')[0];
	var zhezhao = document.getElementsByClassName('zhezhao');
	var zz1 = document.getElementsByClassName('zz1')[0];
	var zz2 = document.getElementsByClassName('zz2')[0];
	var nav = document.getElementsByClassName('nav')[0];
	var resume = document.getElementsByClassName('resume')[0];
	var body = document.getElementsByTagName('body')[0];
	var height = document.documentElement.clientHeight;
	var halfWidth = document.documentElement.clientWidth/2;
	
	resume.style.width = halfWidth*2 - 250 + 'px';
	ava.style.left = halfWidth - 100 + 'px';
	zhezhao[0].style.width = halfWidth + 'px';
	zhezhao[1].style.width = halfWidth + 'px';
	zz1.style.left = 0;
	zz1.style.height = height + 'px';
	zz2.style.right = 0;
	zz2.style.height = height + 'px';
	
	ava.onclick = function() {
		var This = this;
		startMove(zz1, {
			'width': 0,
		}, 15, function() {
			zz1.remove();
		});
		startMove(zz2, {
			'width': 0,
		}, 15, function() {
			zz2.remove();
		});
		startMove(This, {
			'opacity': 100,
			'left': 250,
			'top': 100,
			'width': 400,
			'height': 400
		}, 20, function() {
			startMove(This, {
				'left': 50,
				'top': 50,
				'width': 150,
				'height': 150
			}, 4);
			startMove(nav, {'left': 0}, 10, function() {
				This.remove();
				body.style.overflow = 'auto';
			});
		});
	};
	showQR();
}

addEventListener("load", function() {
	setTimeout(function() {
		window.scrollTo(0,1);
	}, 0);
}, false); 

function showQR() {
	var wechat = document.getElementsByClassName('wechat')[0];
	var qq = document.getElementsByClassName('qq')[0];
	var wcQR = document.getElementsByClassName('wechat-qr')[0];
	var qqQR = document.getElementsByClassName('qq-qr')[0];
	wechat.onmouseover = function() {
		startMove(wcQR, {'opacity': 100}, 5);
	}
	wechat.onmouseout = function() {
		startMove(wcQR, {'opacity': 0}, 5);
	}
	qq.onmouseover = function() {
		startMove(qqQR, {'opacity': 100}, 5);
	}
	qq.onmouseout = function() {
		startMove(qqQR, {'opacity': 0}, 5);
	}
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


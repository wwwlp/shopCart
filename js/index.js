window.onload = function() {
	secondKill();
	changeBanner();
};

window.onresize = function() {
	setTimeout(function() {
		window.location.reload();
	}, 200);
};

/*
  首页轮播图
 */
function changeBanner() {
	// 1.获取需要的标签
	var banner = document.getElementsByClassName("jd_banner")[0];
	var bannerW = banner.offsetWidth;
	var imageBox = banner.getElementsByTagName("ul")[0]; // 图片的盒子
	var indicatorBox = banner.getElementsByTagName("ol")[0]; // 指示器的盒子
	var allPoints = indicatorBox.getElementsByTagName("li"); // 所有的圆点

	// 2. 设置过渡效果 清除过渡效果 位置改变
	var addTransition = function() {
		imageBox.style.transition = "all 1s ease";
		imageBox.style.webkitTransition = "all 1s ease";
	};

	var removeTransition = function() {
		imageBox.style.transition = "none";
		imageBox.style.webkitTransition = "none";
	};

	var changeTranslateX = function(x) {
		imageBox.style.transform = "translateX(" + x + "px)";
		imageBox.style.webkitTransform = "translateX(" + x + "px)";
	};

	// 3. 让图片盒子滚动起来
	var index = 0;
	var timer = setInterval(scrollImg, 1050);

	function scrollImg() {
		//在图片过渡结束后,已经修改了index，之所以还要写，是防止如果用户点击最后一个按钮时，index=8又要加一
		if(index >= 8) {
			index = 0;
		}
		index++;
		// 设置过渡效果
		addTransition();
		// 改变位置
		changeTranslateX(-index * bannerW);
		// 改变指示器
		for(var i = 0; i < allPoints.length; i++) {
			allPoints[i].className = "";
		}

		allPoints[index - 1].className = "current";
	}

	//4. 指示器点击事件
	for(var i = 0; i < allPoints.length; i++) {
		//为每一个超链接添加一个num属性，是为了给i添加标记，以解决i等于数组的长度而无法辨认每一个具体的i的问题
		//出错点
		allPoints[i].num = i;
		allPoints[i].onclick = function() {
			//4.1 改变指示器
			for(var j = 0; j < allPoints.length; j++) {
				allPoints[j].className = "";
			}
			this.className = "current";
			//4.2 显示对应的图片
			index = this.num;
			changeTranslateX(-(this.num + 1) * bannerW);
		};
	}

	// 5. 当图片过渡结束后,临界值
	mjd.transitionEnd(imageBox, function() {
		// 5.1 清除过渡
		removeTransition();
		// 5.2
		/* 沒有这1步，index=8时，图片就会因为，定时器设置了过渡效果，不能迅速定位，而倒着播放 */
		if(index >= 8) {
			index = 0;
			changeTranslateX(-index * bannerW);
		}
	});

	// 6.鼠标移入移出事件
	banner.onmouseover = function() {
		clearInterval(timer);
	};
	banner.onmouseout = function() {
		timer = setInterval(scrollImg, 1050);
	};
}

/*
   秒杀倒计时
*/
function secondKill() {
	// 1. 获取秒杀标签
	var sencondTime = document.getElementsByClassName("s_kill_time")[0];
	var spans = sencondTime.getElementsByTagName("span");

	// 2. 设置定时器
	var time = 2 * 60 * 60;
	var timer = setInterval(function() {
		time--;
		// 2.1 清除定时器
		if(time < 0) {
			clearInterval(timer);
		}

		// 2.2 拆分成时分秒
		var h = Math.floor(time / (60 * 60));
		var m = Math.floor((time % (60 * 60)) / 60);
		var s = time % 60;

		// 2.3 把内容显示到标签上(出错点)
		spans[0].innerHTML = h >= 10 ? Math.floor(h / 10) : 0;
		spans[1].innerHTML = h % 10;

		spans[3].innerHTML = m >= 10 ? Math.floor(m / 10) : 0;
		spans[4].innerHTML = m % 10;

		spans[6].innerHTML = s >= 10 ? Math.floor(s / 10) : 0;
		spans[7].innerHTML = s % 10;
	}, 1000);
}

window.mjd = {};
// 判断过渡之后的临界值
mjd.transitionEnd = function(obj, callBack) {
	// 1. 判断obj是否是对象
	if(typeof obj != 'object') return;

	// 2. 处理
	obj.addEventListener('transitionEnd', function(e) {
		callBack && callBack(e);
	});

	obj.addEventListener('webkitTransitionEnd', function(e) {
		callBack && callBack(e);
	});
}
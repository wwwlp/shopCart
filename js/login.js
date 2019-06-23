(function(window) {
	// 监听点击按钮
	var login = document.getElementById("login");
	var mask = document.getElementById("mask");
	var close_btn = document.getElementById("close_btn");
	login.onclick = function() {
		mask.style.display = "block";
	};
	close_btn.onclick = function() {
		mask.style.display = "none";
	};

	var loginBtn = document.getElementById("loginBtn");
	loginBtn.onclick = function() {
		mask.style.display = "none";
		var loginUser = document.getElementById("loginUser").value;
		if(loginUser) {
			login.innerText = loginUser;
		}
	}
})(window);
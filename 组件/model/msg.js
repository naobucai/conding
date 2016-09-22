(function () {
	var html = '<div id="msgModel"> <img id="msgIcon" src="img/lost.png"/> <span id="msgText"></span> </div>';
	$('body').append(html);

	var model = document.getElementById('msgModel');
	var msgIcon = document.getElementById('msgIcon');

	model.style.position = 'absolute';
	model.style.left = '50%';
	model.style.top = '50%';
	model.style.transform = 'translate(-50%,-50%)';
	model.style.padding = '30px 37px';
	model.style.borderRadius = '8px';
	model.style.textAlign = 'center';
	model.style.fontSize = '20px';
	model.style.opacity = '0';
	model.style.display = 'none';
	model.style.zIndex = '99999';
	msgIcon.style.verticalAlign = 'bottom';
})();

function msg(isLost,text) {
	var model = document.getElementById('msgModel');
	var msgIcon = document.getElementById('msgIcon');
	model.style.opacity = '0';
	model.style.display = 'none';
	clearInterval(model.timer);
	clearTimeout(model.outT);



	document.getElementById('msgText').innerText = text;
	if (isLost) {
		msgIcon.src = 'img/success.png';
		model.style.color = '#56c6d4';
		model.style.boxShadow = '0 0 4px 4px #b0e4eb';
		model.style.border = '1px solid #56c6d4';
	}
	else {
		msgIcon.src = 'img/lost.png';
		model.style.color = '#fe998b';
		model.style.boxShadow = '0 0 4px 4px #ffd5cf';
		model.style.border = '1px solid #fe998b';
	}

	outIn(model,0.1,function () {
		// console.log('消失');

		outIn(model,-0.1,function () {
			model.style.display = 'none';

		});

	});

	function outIn(self,n,fn) {
		self.style.display = 'block';
		self.timer = setInterval(function () {
			self.style.opacity = +self.style.opacity+ n;
			if (+self.style.opacity === 1 || +self.style.opacity === 0) {
				clearInterval(self.timer);
				// console.log(self.style.opacity);
				if (fn) {
					self.outT = setTimeout(function () {
						fn();
					},1000)
				}
			}
		},50);
	}
}
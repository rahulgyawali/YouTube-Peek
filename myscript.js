var intervl = 400;

set_listeners();

function set_listeners() {
	arr = document.getElementsByClassName('thumb-link');
	for (var i = arr.length - 1; i >= 0; i--) {
		arr[i].addEventListener("mouseover", send_req);
	}
	arr = document.getElementsByClassName('video-list-item');
	for (var i = arr.length - 1; i >= 0; i--) {
		arr[i].addEventListener("mouseleave", stop_anim);
	}
}

function stop_anim() {
	document.getElementById('slide_board').remove();
	console.log('mouse leave');
}

function rqpcr() {
	console.log('this',this);
	str = this.response;
	//console.log(str);
	var re = /storyboard_spec\":\"([^"]*)"/;
	res = str.match(re)[1];
	console.log(res);
	t1 = res.indexOf('|');
	t2 = res.indexOf('|', t1 + 1);
	t3 = res.indexOf('|', t2 + 1);
	fine_res = res.slice(t2 + 1, t3);
	console.log(fine_res);
	obja = {};
	obja.w = 160;
	temp = fine_res.indexOf('#');
	temp1 = fine_res.indexOf('#', temp + 1);
	temp2 = fine_res.indexOf('#', temp1 + 1);
	temp3 = fine_res.indexOf('#', temp2 + 1);
	temp4 = fine_res.indexOf('#', temp3 + 1);
	// console.log(fine_res.slice(temp + 1, temp1));
	// console.log(fine_res.slice(temp1 + 1, temp2));
	// console.log(fine_res.slice(temp2 + 1, temp3));
	obja.h = parseInt(fine_res.slice(temp + 1, temp1));
	obja.no = parseInt(fine_res.slice(temp1 + 1, temp2));
	obja.strip_h = parseInt(fine_res.slice(temp2 + 1, temp3));
	obja.strip_w = parseInt(fine_res.slice(temp3 + 1, temp4));
	obja.sigh = fine_res.slice(fine_res.lastIndexOf('#') + 1);
	obja.v_id = v_id;
	console.log(obja);
	start()
}

function init(v_id) {
	req = new XMLHttpRequest();
	req.open("GET", "https://www.youtube.com/watch?v=" + v_id);
	req.send();
	req.addEventListener("load", function(obja) {
		//console.log('this',this);
		str = this.response;
		//console.log(str);
		var re = /storyboard_spec\":\"([^"]*)"/;
		res = str.match(re)[1];
		console.log(res);
		t1 = res.indexOf('|');
		t2 = res.indexOf('|', t1 + 1);
		t3 = res.indexOf('|', t2 + 1);
		t4 = res.indexOf('|', t3 + 1);
		console.log(t4);
		if(t4 == -1)
			fine_res = res.slice(t3 + 1);
		else
			fine_res = res.slice(t3 + 1, t4);	
		console.log(fine_res);
		obja = {};
		obja.w = 160;
		temp = fine_res.indexOf('#');
		temp1 = fine_res.indexOf('#', temp + 1);
		temp2 = fine_res.indexOf('#', temp1 + 1);
		temp3 = fine_res.indexOf('#', temp2 + 1);
		temp4 = fine_res.indexOf('#', temp3 + 1);
		// console.log(fine_res.slice(temp + 1, temp1));
		// console.log(fine_res.slice(temp1 + 1, temp2));
		// console.log(fine_res.slice(temp2 + 1, temp3));
		obja.h = parseInt(fine_res.slice(temp + 1, temp1));
		obja.no = parseInt(fine_res.slice(temp1 + 1, temp2));
		obja.strip_h = parseInt(fine_res.slice(temp2 + 1, temp3));
		obja.strip_w = parseInt(fine_res.slice(temp3 + 1, temp4));
		obja.sigh = fine_res.slice(fine_res.lastIndexOf('#') + 1);
		obja.v_id = v_id;
		console.log(obja);
		start_anim(obja);
	});
}	

function send_req() {
	console.log('mouse leave');
	raw_id = this.getAttribute('href');
	id = raw_id.slice(9);
	init(id);
	tst_elem = document.createElement('div');
	tst_elem.id = 'slide_board';
	tst_elem.style.height = '100%';
	tst_elem.style.width = '100%';
	tst_elem.style.overflow = 'hidden';
	tst_elem.style.top = '0px';
	tst_elem.style.position = 'absolute';
	tst_elem.style.background = 'white';
	tst_elem.style.padding = '3px';


	this.parentNode.appendChild(tst_elem);
}

function start_anim(obja) {
	i = 0;
	sld_brd = document.getElementById('slide_board');
	console.log(sld_brd);
	if (sld_brd.childNodes.length == 0) {
		console.log(obja);
		tst_elem1 = document.createElement('div');
		tst_elem1.style.width = (obja.w).toString() + 'px';
		tst_elem1.style.height = (obja.h).toString() + 'px';
		tst_elem1.style.margin = '0px';
		tst_elem1.style.position = 'absolute';
		tst_elem1.style.overflow = 'hidden';

		tst_elem = document.createElement('img');
		tst_elem.id = 'slide_board_image';
		tst_elem.style.zIndex = '200';
		tst_elem.style.position = 'absolute'
		tst_elem.style.top = '0px';
		tst_elem.style.left = '0px';
		urll = 'https://i9.ytimg.com/sb/' + obja.v_id + '/storyboard3_L2/M' + i +'.jpg?sigh=' + obja.sigh + '0';
		tst_elem.src = urll;
		console.log(urll);
		tst_elem1.appendChild(tst_elem);
		sld_brd.appendChild(tst_elem1);
		mov_start(obja, 0);
	}
}

function mov_start(obja, i) {
	console.log(obja, i);
	tst_elem = document.getElementById('slide_board_image');
	w = obja.w;
	h = obja.h;
	s_h = obja.strip_h;
	s_w = obja.strip_w;
	no = obja.no;
	tst_elem.style.left = '-' + ((i % s_w) * w).toString() + 'px';
	tst_elem.style.top = '-' + (Math.floor(i / s_w) * h).toString() + 'px';
	if(i == s_h * s_w )
		i = 0;
	setTimeout(function(){ mov_start(obja, i + 1);}, 500);
}	

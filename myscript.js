var intervl = 400;

set_listeners();

function set_listeners() {
	arr = document.getElementsByClassName('thumb-link');
	console.log(arr.length)
	if(arr.length == 0) {
		set_listeners_home();
		return;
	}
	for (var i = arr.length - 1; i >= 0; i--) {
		arr[i].addEventListener("mouseover", send_req);
	}
	arr = document.getElementsByClassName('video-list-item');
	for (var i = arr.length - 1; i >= 0; i--) {
		arr[i].addEventListener("mouseleave", stop_anim);
	}
}

function set_listeners_home() {
	arr = document.getElementsByClassName('yt-lockup-thumbnail');
	console.log(arr.length);
	for (var i = arr.length - 1; i >= 0; i--) {
		console.log(arr[i].childNodes[0])
		arr[i].childNodes[0].addEventListener("mouseover", send_req);
	}
	arr = document.getElementsByClassName('yt-shelf-grid-item');
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
	sld_brd = document.getElementById('slide_board');
	console.log(sld_brd);
	if (sld_brd.childNodes.length == 0) {
		console.log(obja);
		par_div = document.createElement('div');
		par_div.style.width = (obja.w).toString() + 'px';
		par_div.style.height = (obja.h).toString() + 'px';
		par_div.style.margin = '0px';
		par_div.style.position = 'absolute';
		par_div.style.overflow = 'hidden';

		img_wrpr = document.createElement('div');
		img_wrpr.id = 'slide_board_wrpr'
		img_wrpr.style.width = (Math.ceil(obja.w * obja.strip_w)).toString() + 'px';
		img_wrpr.style.height = (Math.ceil(obja.h * obja.no / obja.strip_w)).toString() + 'px';
		img_wrpr.style.margin = '0px';
		img_wrpr.style.position = 'absolute';
		img_wrpr.style.overflow = 'hidden';

		max_len = Math.ceil(obja.no / (obja.strip_w * obja.strip_h));
		console.log(max_len)

		for (var i = 0; i <= max_len; i++) {
			tst_elem = document.createElement('img');
			tst_elem.style.zIndex = '200';
			tst_elem.style.position = 'relative'
			tst_elem.style.top = '0px';
			tst_elem.style.left = '0px';
			urll = 'https://i9.ytimg.com/sb/' + obja.v_id + '/storyboard3_L2/M' + i +'.jpg?sigh=' + obja.sigh + '0';
			tst_elem.src = urll;
			console.log(urll);
			img_wrpr.appendChild(tst_elem);		
		}		

		// tst_elem = document.createElement('img');
		// tst_elem.id = 'slide_board_image';
		// tst_elem.style.zIndex = '200';
		// tst_elem.style.position = 'absolute'
		// tst_elem.style.top = '0px';
		// tst_elem.style.left = '0px';
		par_div.appendChild(img_wrpr);
		sld_brd.appendChild(par_div);

		// i = 0;
		// while(true) {
			
		mov_start(obja, 0);
		// }
	}
}

function mov_start(obja, i) {
	console.log(obja, i);
	tst_elem = document.getElementById('slide_board_wrpr');
	w = obja.w;
	h = obja.h;
	s_h = obja.strip_h;
	s_w = obja.strip_w;
	no = obja.no;
	tst_elem.style.left = '-' + ((i % s_w) * w).toString() + 'px';
	tst_elem.style.top = '-' + (Math.floor(i / s_w) * h).toString() + 'px';
	if(i == no )
		i = 0;
	setTimeout(function(){ mov_start(obja, i + 1);}, 500);
}	

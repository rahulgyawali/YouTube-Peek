chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
	    console.log(response.farewell);
	  });
	});


var intervl = 400;

function chek() {
	console.log('in chek');
	if(document.getElementsByClassName('thumb-link')[0] !== undefined)
		set_listeners();
	else
		setTimeout(chek, intervl);
}

function set_listeners() {
	arr = document.getElementsByClassName('thumb-link');
	for (var i = arr.length - 1; i >= 0; i--) {
		arr[i].addEventListener("onmouseenter", send_start);
		arr[i].addEventListener("onmouseleave", send_stop);
	}
}

function send_start() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
	    console.log(response.farewell);
	  });
	});
}

console.log('hii');
chek();


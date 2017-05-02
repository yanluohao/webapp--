$.get('/ajax/category', function (d) {
	var windowWidth = $(window).width();
	windowWidth = windowWidth < 320 ? 320 : windowWidth;
	new Vue({
		el: '#app',
		data:d
	});
}, 'json');
function resizeFont(id) {
	var arr = $('h1, h2, h3, p, .responsive-accordion-head, .responsive-accordion-head li, .responsive-accordion-panel a, .materials_content span, .materials_download span, .resource_library_con a');
	var fontSize = parseInt(window.getComputedStyle(arr[0]).getPropertyValue('font-size'));
	console.log(fontSize);
	if ( id === 'resizeTextSmaller' || id === 'resizeTextBigger') {
		for (var i = 0; i < arr.length; i++) {
			fontSize = parseInt(window.getComputedStyle(arr[i]).getPropertyValue('font-size'));
			if (id === 'resizeTextSmaller')
				fontSize--;
			else
				fontSize++;
			arr[i].style.fontSize = fontSize + 'px';
		}
	}
}
$(document).ready(function () {
	$('.search-icon').prev('input').keyup(function (event) {
		if (event.keyCode == 13) {
			$('.search-icon').click();
		}
	});
	$('.search-icon').click(function () {
		var query = $(this).prev('input').val();
		window.location.replace("/gosafeonline/ecskit/content/searchresult?q="+query);
	});
})
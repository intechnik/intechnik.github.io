$(document).ready(function () {
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		hideMenuIfNeeded();
	})
	
	$('#navbarBrand').click(function () {
		$("#mainNavbar a:first").tab('show');
		hideMenuIfNeeded();
	});
	
	var initBodyPadding = '70px';
	
	$("body").css("padding-top", initBodyPadding).css("padding-bottom", initBodyPadding);
	
	$('#mainNavbar').on('shown.bs.collapse', function () { $("body").css("padding-top", "+=" + $(this).height()); });
	
	$('#mainNavbar').on('hidden.bs.collapse', function () { $("body").css("padding-top", initBodyPadding); });
});

function hideMenuIfNeeded() {
    if ($(document).width() <= 768 && $('#mainNavbar').hasClass('in')) {
		$('#mainNavbar').collapse('hide');
	}
}
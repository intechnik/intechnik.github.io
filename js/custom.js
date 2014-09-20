var SHOULD_SAVE_LAST_TAB = true;

$(document).ready(function () {

	goToLastTab();
	
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		saveLastTab(e.target.hash);
		hideMenuIfNeeded();
	})
	
	$('#navbarBrand').click(function () {
		$('a[href="#ofirmie"]').tab('show');
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

function goToLastTab() {
	if (SHOULD_SAVE_LAST_TAB) {
		$( 'a[href="' + localStorage.getItem('intechnik.latestTab') + '"]' ).tab('show');
	}
}

function saveLastTab(lastTab) {
	if (SHOULD_SAVE_LAST_TAB) {
		localStorage.setItem('intechnik.latestTab', lastTab);
	} else {
		localStorage.removeItem('intechnik.latestTab');
	}
}
var INTECHNIK_LATEST_TAB_KEY = 'intechnik.latestTab';
var INTECHNIK_LATEST_TAB_CHANGE_KEY = 'intechnik.latestTabChange';
var EXPIRE_TIME_IN_MILISECONDS = 43200000; //is equal to 0.5 day

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
	var lastTab = localStorage.getItem(INTECHNIK_LATEST_TAB_KEY),
		lastTabChange = localStorage.getItem(INTECHNIK_LATEST_TAB_CHANGE_KEY);
	if (isLessThanExpirationTime(getCurrentTime() - lastTabChange)) {
		$( 'a[href="' + lastTab + '"]' ).tab('show');
	} else {
		localStorage.removeItem(INTECHNIK_LATEST_TAB_KEY);
		localStorage.removeItem(INTECHNIK_LATEST_TAB_CHANGE_KEY);
	}
}

function saveLastTab(lastTab) {
	localStorage.setItem(INTECHNIK_LATEST_TAB_KEY, lastTab);
	localStorage.setItem(INTECHNIK_LATEST_TAB_CHANGE_KEY, getCurrentTime());
}

function isLessThanExpirationTime(periodFromLastChange) {
	return periodFromLastChange < EXPIRE_TIME_IN_MILISECONDS;
}

function getCurrentTime() {
	return new Date().getTime().toString();
}
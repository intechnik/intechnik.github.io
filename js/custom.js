var INTECHNIK_LATEST_TAB_KEY = 'intechnik.latestTab';
var INTECHNIK_LATEST_TAB_CHANGE_KEY = 'intechnik.latestTabChange';
var EXPIRE_TIME_IN_MILISECONDS = 43200000; //is equal to 0.5 day

var INIT_BODY_PADDING = '70px';

$(document).ready(function () {

	$('#navbarBrand').click(function () {
		$('a[href="#ofirmie"]').click();
	});
	
	$('a[data-toggle="tab"]').click(function (e) {
		saveLastTab(e.target.hash);
		hideMenuIfNeeded();
	})
	
	googleAnalytics();

	goToLastTab();
	
	$("body").css("padding-top", INIT_BODY_PADDING).css("padding-bottom", INIT_BODY_PADDING);
	
	$('#mainNavbar').on('shown.bs.collapse', function () { $("body").css("padding-top", "+=" + $(this).height()); });
	
	$('#mainNavbar').on('hidden.bs.collapse', function () { $("body").css("padding-top", INIT_BODY_PADDING); });
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

function googleAnalytics() {
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	ga('create', 'UA-2442307-3', 'auto');
	ga('send', 'pageview');
	ga('set', 'dimension1', localStorage.getItem(INTECHNIK_LATEST_TAB_KEY));
}
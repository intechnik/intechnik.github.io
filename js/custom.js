
var lastOpenTab = new LastOpenTab();

var mainNavbar = $('#mainNavbar'),
	body = $('body'),
	tabs = $('a[data-toggle="tab"]');

redirectIfHashExistsInUrl();
	
$('#navbarBrand').click(function () {
	$('a[href="#ofirmie"]').click();
});

tabs.click(function (e) {
	lastOpenTab.save(e.target.hash);
	hideMenuIfNeeded();
})

var INIT_BODY_PADDING = '70px';

body.css("padding-top", INIT_BODY_PADDING).css("padding-bottom", INIT_BODY_PADDING);

mainNavbar.on('shown.bs.collapse', function () { body.css("padding-top", "+=" + $(this).height()); });

mainNavbar.on('hidden.bs.collapse', function () { body.css("padding-top", INIT_BODY_PADDING); });

lastOpenTab.goTo();

googleAnalytics();

function redirectIfHashExistsInUrl() {
	var VALID_TABS = [];
	tabs.each(function() { VALID_TABS.push(this.hash); });
	if ($.inArray( window.location.hash, VALID_TABS ) > -1) {
		lastOpenTab.save(window.location.hash);
		window.location = window.location.origin + window.location.pathname;
	}
}

function hideMenuIfNeeded() {
    if ($(document).width() <= 768 && mainNavbar.hasClass('in')) {
		mainNavbar.collapse('hide');
	}
}

function googleAnalytics() {
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	ga('create', 'UA-2442307-3', 'auto');
	ga('send', 'pageview');
	ga('set', 'dimension1', lastOpenTab.getHash());
}

function LastOpenTab() {

	this.INTECHNIK_LATEST_TAB_KEY = 'intechnik.latestTab';
	this.INTECHNIK_LATEST_TAB_CHANGE_KEY = 'intechnik.latestTabChange';
	this.EXPIRE_TIME_IN_MILISECONDS = 43200000; //is equal to 0.5 day
	
	this.getHash = function() {
		return localStorage.getItem(this.INTECHNIK_LATEST_TAB_KEY);
	}
	this.getChangeTime = function() {
		return localStorage.getItem(this.INTECHNIK_LATEST_TAB_CHANGE_KEY);
	}	
	this.goTo = function() {
		if (wasChangedBeforeExpirationTime(this)) {
			$( 'a[href="' + this.getHash() + '"]' ).tab('show');
		} else {
			localStorage.removeItem(this.INTECHNIK_LATEST_TAB_KEY);
			localStorage.removeItem(this.INTECHNIK_LATEST_TAB_CHANGE_KEY);
		}
	}	
	this.save = function(lastTabHash) {
		localStorage.setItem(this.INTECHNIK_LATEST_TAB_KEY, lastTabHash);
		localStorage.setItem(this.INTECHNIK_LATEST_TAB_CHANGE_KEY, getCurrentTime());
	}
	
	function getCurrentTime() {
		return new Date().getTime().toString();
	}
	function wasChangedBeforeExpirationTime(lastTab) {
		return ( getCurrentTime() - lastTab.getChangeTime() ) < lastTab.EXPIRE_TIME_IN_MILISECONDS;
	}
	
	/*
	var object = {value: "value", timestamp: new Date().getTime()}
	localStorage.setItem("key", JSON.stringify(object));

	var object = JSON.parse(localStorage.getItem("key")),
	*/

}
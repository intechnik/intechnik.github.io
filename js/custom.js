
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
	var urlHash = window.location.hash;
	if (urlHash && urlHash.indexOf('#') == 0) {
		var VALID_TABS = [];
		tabs.each(function() { VALID_TABS.push(this.hash); });
		if ($.inArray(urlHash, VALID_TABS ) > -1) {
			lastOpenTab.save(urlHash);
		}
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
	this.EXPIRE_TIME_IN_MILISECONDS = 43200000; //is equal to 0.5 day
	
	this.getHash = function() {
		var object = JSON.parse(localStorage.getItem(this.INTECHNIK_LATEST_TAB_KEY));
		return $.isEmptyObject(object) ? '#ofirmie' : object.hash;
	}
	this.getChangeTime = function() {
		var object = JSON.parse(localStorage.getItem(this.INTECHNIK_LATEST_TAB_KEY));
		return $.isEmptyObject(object) ? 0 : object.timestamp;
	}	
	this.goTo = function() {
		if (exceededExpirationTime(this)) {
			this.save('#firma')
		}
		$( 'a[href="' + this.getHash() + '"]' ).click();
	}	
	this.save = function(lastTabHash) {
		localStorage.setItem(this.INTECHNIK_LATEST_TAB_KEY, JSON.stringify({hash: lastTabHash, timestamp: getCurrentTime()}));
	}
	
	function getCurrentTime() {
		return new Date().getTime().toString();
	}
	function exceededExpirationTime(lastTab) {
		return ( getCurrentTime() - lastTab.getChangeTime() ) > lastTab.EXPIRE_TIME_IN_MILISECONDS;
	}
}
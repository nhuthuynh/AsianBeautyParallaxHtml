// Avoid `console` errors in browsers that lack a console.
(function () {
    var method;
    var noop = function () { };
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
} ());

// Place any jQuery/helper plugins in here.

$(document).bind('ready', function () {
    if (window.location.href.indexOf('index.html') == -1) {
        $('#nav .navbar .nav-item').click(function (e) {
            e.preventDefault();
            window.location = $(this).attr('data-inside-link');
            return false;
        })
    }
});

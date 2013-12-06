$(document).bind('ready', function () {
    var $win = $(window),
    section = $('#main .section'),
    nav = $('#nav .navbar'),
    links = $('#nav .navbar .nav-item'),
    htmlbody = $('html, body');

    $win.stellar({
        horizontalScrolling: false,
        verticalScrolling: true
    });

    section.waypoint(function (ev, dir) {
        dataslide = $(this).attr('data-slide');

        $('.nav-item[href*=' + dataslide + ']', nav).parent().addClass('active').siblings().removeClass('active');
    });

    $win.scroll(function () {
        if ($win.scrollTop() == 0) {
            $('.nav-item[href*="intro"]', nav).parent().addClass('active').siblings().removeClass('active');
        }
    });

    function goToByScroll(dataslide) {
        console.log(dataslide);
        htmlbody.animate({
            scrollTop: $('#main .section[data-slide="' + dataslide + '"]').offset().top
        }, 2000, 'easeInOutQuint');
    }

    links.bind('click', function (e) { e.preventDefault(); goToByScroll($(this).attr('href')); return false; })

});
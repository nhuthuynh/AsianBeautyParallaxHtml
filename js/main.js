$(document).bind('ready', function () {
    var $win = $(window),
    section = $('#main .section'),
    nav = $('#nav .navbar'),
    links = $('#nav .navbar .nav-item'),
    htmlbody = $('html, body'),
    lastScrollPos = 0,
    listSections = ["intro", "exhibit", "visitor", "about"],
    currentSection = 0, isScrollable = true;

    $win.stellar({
        horizontalScrolling: false,
        verticalScrolling: true
    });

    section.waypoint(function (ev, direction) {
        console.log(direction, $('#header').outerHeight());
        dataslide = $(this).attr('data-slide');
        $('.nav-item[href*=' + dataslide + ']', nav).parent().addClass('active').siblings().removeClass('active');
    });

    $win.scroll(function () {
        if (!isScrollable) return;
        isScrollable = false;
        if ($win.scrollTop() == 0) {
            $('.nav-item[href*="intro"]', nav).parent().addClass('active').siblings().removeClass('active');
        }
        console.log('before', currentSection);
        if (lastScrollPos > $win.scrollTop()) currentSection--;
        else currentSection++;
        console.log('after', currentSection);
        //goToByScroll(listSections[currentSection]);
    });

    function goToByScroll(dataslide) {
        currentSection = listSections.indexOf(dataslide);
        htmlbody.animate({
            scrollTop: $('#main .section[data-slide="' + dataslide + '"]').offset().top
        }, 2000, 'easeInOutQuint', function () {
            isScrollable = true;
        });
    }

    links.bind('click', function (e) { e.preventDefault(); goToByScroll($(this).attr('href')); return false; })

});
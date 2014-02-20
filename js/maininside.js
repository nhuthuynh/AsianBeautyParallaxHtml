$(document).bind('ready', function () {
    $('#nav .navbar .nav-item').click(function (e) {
        e.preventDefault();
        window.location.href = $(this).attr('data-inside-link');
		return false;
    })
});

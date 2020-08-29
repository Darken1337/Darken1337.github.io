$('.hamburger').on('click', function(){
    $('#menu').fadeToggle(200);
    $(this).toggleClass('is-active');
    $('body').toggleClass('o-hidden');
})

$('.js-drop-open').on('click', function(){
    var toOpen = $(this).siblings('.js-drop');
    if(toOpen.length === 0) return;
    $(this).toggleClass('is-active');
    toOpen.slideToggle();
})
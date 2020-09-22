$('.js-post-single-slider').slick({
    slidesToShow: 3,
    appendArrows: $('.blog-post-slider__controls'),
    prevArrow: '<button type="button" class="blog-post-slider__arrow prev"><i class="icon-arrow-down"></i></button>',
    nextArrow:  '<button type="button" class="blog-post-slider__arrow next"><i class="icon-arrow-down"></i></button>'
})

$('input').on('focus', function(){
    var parent = $(this).parents('.js-input-control');
    if(parent.length === 0) return;
    parent.addClass('is-focused');
})

$('input').on('blur', function(){
    var parent = $(this).parents('.js-input-control');
    if(parent.length === 0) return;
    parent.removeClass('is-focused');
})
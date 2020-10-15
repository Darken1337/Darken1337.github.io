jQuery(document).ready(function(){
    $('.js-toggle-search').on('click', function(){
        $('body').toggleClass('o-hidden');
        $('#search').slideToggle(200);
    })
    $('.js-menu-close').on('click', function(){
        $('body').removeClass('o-hidden');
        $('#menu').fadeOut(200);
    })
    $('.js-menu-open').on('click', function(){
        $('#menu').fadeIn(200);
        $('body').addClass('o-hidden')
    })
    $('[data-tab-open]').on('click', function(){
        var parent = $(this).parents('[data-tabs="container"]');
        if(parent.length === 0) return;
        var tabIdToOpen = $(this).attr('data-tab-open');
        var elementToOpen = parent.find('[data-tab="' + tabIdToOpen + '"]');

        if(elementToOpen.length > 0){
            parent.find('[data-tab-open].is-active').removeClass('is-active');
            $(this).addClass('is-active');
            parent.find('[data-tab]').hide(0);
            elementToOpen.show(0);
        }
    })
    $('.js-banner-slider').slick({
        dots: true,
        arrows: false,
        appendDots: $('.banner-slider-dots')
    })
    $('.js-about-slider').slick({
        arrows: true,
        prevArrow: '<button class="about-slider__arrow prev"><svg><use xlink:href="./img/sprites.svg#arrow-left"></use></svg></button>',
        nextArrow: '<button class="about-slider__arrow next"><svg><use xlink:href="./img/sprites.svg#arrow-right"></use></svg></button>',
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    })
    $('.js-drop-open').on('click', function(){
        var dropToOpen = $(this).siblings('.js-drop-body');
        if(dropToOpen.length === 0) return;
        $('.js-drop-body.is-active').slideUp(200)
                .removeClass('is-active');
        dropToOpen.slideToggle(200)
            .addClass('is-active');
    })
})
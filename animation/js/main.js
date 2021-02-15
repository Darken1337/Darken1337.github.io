$(function(){
    var isMobile = $(window).width() < 767;
    var isTablet = $(window).width() < 1025 && $(window).width() > 767;

    // Logo animation

    document.getElementById('logo').classList.add('is-animated');

    // Banner slider
    $('.js-banner-slider').slick({
        slidesToShow: 1,
        prevArrow: '<button type="button" class="slider-arrow prev"><svg><use xlink:href="./img/sprites.svg#arrow-left"></use></svg></button>',
        nextArrow: '<button type="button" class="slider-arrow next"><svg><use xlink:href="./img/sprites.svg#arrow-right"></use></svg></button>',
        dots: true,
        appendDots: $('.banner-slider__dots'),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: false
                }
            }
        ]
    })
    if(isMobile){
        // Types slider
        $('.js-types-slider').slick({
            slidesToShow: 1,
            prevArrow: '<button type="button" class="slider-arrow prev"><svg><use xlink:href="./img/sprites.svg#arrow-left"></use></svg></button>',
            nextArrow: '<button type="button" class="slider-arrow next"><svg><use xlink:href="./img/sprites.svg#arrow-right"></use></svg></button>'
        })
    }

    // Footer focus inputs
    $('.form-group input, .form-group textarea').on('focus', function(){
        $(this).parents('.form-group').addClass('is-active');
    })
    $('.form-group input, .form-group textarea').on('blur', function(){
        $(this).parents('.form-group').removeClass('is-active');
    })

     // About tabs
    if(isTablet){
        $('.js-about-item').on('click', function(){
            if($(this).hasClass('is-active')) return;
            var itemToFix;
            if( isMobile ){
                itemToFix = $(this).prev();
                if(itemToFix.length > 0){
                    setTimeout(() => {
                        var itemHeight = $(this).outerHeight(); 
                        var itemMargin = itemToFix.css('margin-bottom');
                        itemToFix.find('.about-item__dot-after').css('height', itemHeight + itemMargin)
                    }, 1);
                }
                
            }
            // if(isMobile){
                $('.js-about-item').find('.about-item__dot-after').attr('style', '');
            // }
            $('.js-about-item.is-active').removeClass('is-active');
            
            $(this).addClass('is-active');
    
            if(isMobile){
                var margin = parseInt( $(this).css('margin-bottom') );
                var itemToFixHeight = 0;
                if(itemToFix.length === 0){
                    itemToFix = $(this).next();
                }
                    itemToFixHeight = itemToFix.outerHeight()/2
    
                // if($(this).prev().length === 0){
                //     margin = - $(this).outerHeight()/2;
                // }
                $('.js-about-item.is-active').find('.about-item__dot-after').css('height', ($(this).outerHeight()/2) + itemToFixHeight + margin);
            }
            
        })
    }
     

    var initial = $('.js-about-item').get(2);
    if(initial){
        $(initial).trigger('click');
    }
    // About tabs scroll
    if(isTablet){
        new SimpleBar(document.getElementById('about-simplebar'), {
            autoHide: false
        });
    }
    if(isMobile){
        // Industries slider
        $('.js-industries-slider').slick({
            slidesToShow: 1,
            prevArrow: '<button type="button" class="slider-arrow prev"><svg><use xlink:href="./img/sprites.svg#arrow-left"></use></svg></button>',
            nextArrow: '<button type="button" class="slider-arrow next"><svg><use xlink:href="./img/sprites.svg#arrow-right"></use></svg></button>'
        })
    }
    
  
    $(document).on('scroll', function(){
        checkFixedHeader();
    })

    checkFixedHeader();
    function checkFixedHeader(){
        var section = $('#s-banner'),
            fixedHeader = $('#fixed-header');

        if(window.pageYOffset > section.outerHeight()){
            fixedHeader.removeClass('is-hidden');
        }else{
            fixedHeader.addClass('is-hidden');
        }
    }
})
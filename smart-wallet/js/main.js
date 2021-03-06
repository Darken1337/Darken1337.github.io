$(document).ready(function(){

    var isMobile = $(window).width() < 768;

    // Menu init

    if(isMobile){
        $('.js-menu-toggle').on('click', function(){
            $('#menu').slideToggle();
            $(this).toggleClass('is-active');
            if(! $(this).hasClass('is-active')){
                $('.js-open-submenu').removeClass('is-active');
                $('#menu').find('.sub-menu').hide();
                $('#menu').find('.js-drop-plus').text('+');
            }

        })
        $('.js-open-submenu').on('click', function(ev){
            ev.preventDefault();
            // Structure - li > (a > .js-open-submenu) + ul.submenu
            var subMenu = $(this).siblings('.sub-menu');
    
            if(subMenu.length === 0) return;
    
            $(this).toggleClass('is-active');
            subMenu.slideToggle(200);
            if($(this).hasClass('is-active')){
                $(this).find('.js-drop-plus').text('-');
            }else{
                $(this).find('.js-drop-plus').text('+');
            }
        })
    }

    $('#slider').slick({
        dots: true,
        arrows: true,
        appendDots: $('#slider-dots'),
        prevArrow: '<button type="button" class="usage-slider__arrow prev"><img src="./img/icons/arrow-left.svg"/></button>',
        nextArrow: '<button type="button" class="usage-slider__arrow next"><img src="./img/icons/arrow-right.svg"/></button>',
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 4000
    })
    $('#services-slider').slick({
        dots: false,
        arrows: true,
        prevArrow: '<button type="button" class="usage-slider__arrow prev"><img src="./img/icons/arrow-left.svg"/></button>',
        nextArrow: '<button type="button" class="usage-slider__arrow next"><img src="./img/icons/arrow-right.svg"/></button>',
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 4000
    })

    // Slider
    // $("#slider").waterwheelCarousel({
    //     forcedImageWidth: 222,
    //     keyboardNav: true,
    //     linkHandling: 1,
    //     horizonOffsetMultiplier: 1,
    //     autoPlay: 2000,
    //     movedToCenter: function(image){
    //         var imageId = findImageIndex(image[0]);
    //         var dotToEnable = $('#slider-dots .js-slider-dot').get(imageId);

    //         $('.js-slider-dot.is-active').removeClass('is-active');
    //         $(dotToEnable).addClass('is-active');
    //     }
    // });

    // if(document.querySelector('[data-template="dot"]')){
    //     // Set manually dots
    //     var dotsList = $('#slider-dots');
    //     var dotTemplate = document.querySelector('[data-template="dot"]').content;

    //     $('#slider img').each(function(index, element){
    //         var currentDot = dotTemplate.cloneNode(true);
    //         var button = currentDot.querySelector('.js-slider-dot');
                
    //         if(index == 2){
    //             button.classList.add('is-active');
    //         }
    //         button.onclick = function(){
    //             $('.js-slider-dot.is-active').removeClass('is-active');
    //             button.classList.add('is-active');
    //             element.click();
    //         };
    //         dotsList[0].append(currentDot);
    //     });

    //     function findImageIndex(node){
    //         return Array.prototype.slice
    //                     .call( document.getElementById('slider').children )
    //                     .indexOf( node );
    //     }
    // }

    if(isMobile){
        $('#clients').slick({
            dots: false,
            arrows: true,
            prevArrow: '<button type="button" class="clients-list__arrow prev">&lsaquo;</button>',
            nextArrow: '<button type="button" class="clients-list__arrow next">&rsaquo;</button>',
            slidesToShow: 3,
            responsive: [
                {
                    breakpoint: 566,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        })
        $('#integration-list').slick({
            dots: false,
            arrows: true,
            prevArrow: '<button type="button" class="integration__arrow prev">&lsaquo;</button>',
            nextArrow: '<button type="button" class="integration__arrow next">&rsaquo;</button>',
            slidesToShow: 1,
        })
    }

    $('#usage-slider').slick({
        dots: false,
        arrows: true,
        prevArrow: '<button type="button" class="usage-slider__arrow prev"><img src="./img/icons/arrow-left.svg"/></button>',
        nextArrow: '<button type="button" class="usage-slider__arrow next"><img src="./img/icons/arrow-right.svg"/></button>',
        slidesToShow: 1
    })

    $('#news-slider').slick({
        dots: true,
        appendDots: $('#news-dots'),
        arrows: false,
        slidesToShow: 1
    })

    for(var i = 1; i <= 3; i++){
        $('#general-about-slider-' + i).slick({
            dots: false,
            arrows: false,
            autoplay: 4000,
            prevArrow: '<button type="button" class="usage-slider__arrow prev"><img src="./img/icons/arrow-left.svg"/></button>',
            nextArrow: '<button type="button" class="usage-slider__arrow next"><img src="./img/icons/arrow-right.svg"/></button>',
            slidesToShow: 1
        })
    }

    $('[data-general-slider]').on('click', function(){
        $('[data-general-slider].is-active').removeClass('is-active');
        $(this).addClass('is-active');
    })

})


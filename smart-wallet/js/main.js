$(document).ready(function(){

    var isMobile = $(window).width() < 768;

    // Menu init

    if(isMobile){
        $('.js-menu-open').on('click', function(){
            $('#menu').addClass('is-active');
            $('.menu-overlay').fadeIn(200);
        })
        $('.js-menu-close').on('click', function(){
            $('#menu').removeClass('is-active');
            $('.menu-overlay').fadeOut(200);
        })
        $('.menu-overlay').on('click', function(){
            $('#menu').removeClass('is-active');
            $('.menu-overlay').fadeOut(200);
        })
        $('.js-open-submenu').on('click', function(ev){
            ev.stopPropagation();
            // Structure - li > (a > .js-open-submenu) + ul.submenu
            var subMenu = $(this).parent().siblings('.sub-menu');
            var link = $(this).parent();

            if(link.hasClass('is-active')) return;
    
            if(subMenu.length === 0) return;
    
            $('#menu a.is-active').removeClass('is-active');
            $('#menu .sub-menu').slideUp(200);
    
            link.toggleClass('is-active');
            subMenu.slideDown(200);
        })
    }

    // Slider
    $("#slider").waterwheelCarousel({
        forcedImageWidth: 222,
        keyboardNav: true,
        linkHandling: 1,
        horizonOffsetMultiplier: 1,
        movedToCenter: function(image){
            var imageId = findImageIndex(image[0]);
            var dotToEnable = $('#slider-dots .js-slider-dot').get(imageId);

            $('.js-slider-dot.is-active').removeClass('is-active');
            $(dotToEnable).addClass('is-active');
        }
    });

    // Set manually dots
    var dotsList = $('#slider-dots');
    var dotTemplate = document.querySelector('[data-template="dot"]').content;

    $('#slider img').each(function(index, element){
        var currentDot = dotTemplate.cloneNode(true);
        var button = currentDot.querySelector('.js-slider-dot');
            
        if(index == 2){
            button.classList.add('is-active');
        }
        button.onclick = function(){
            $('.js-slider-dot.is-active').removeClass('is-active');
            button.classList.add('is-active');
            element.click();
        };
        dotsList[0].append(currentDot);
    });

    function findImageIndex(node){
        return Array.prototype.slice
                    .call( document.getElementById('slider').children )
                    .indexOf( node );
    }

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
    }


})


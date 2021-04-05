jQuery(document).ready(function($){

    var tabletWidth = 992;
    var mobileWidth = 587;
    var isMobile = false;
    var isTablet = false;

    var updateDevice = function(){
        var windowWidth = $(window).width()
        if( windowWidth < mobileWidth ){
            isMobile = true;
        }else if ( windowWidth < tabletWidth ){
            isTablet = true;
        }
    }

    var menuInit = function(){
        var menuWrap = $('#menu-wrap');
        var menuTrigger = menuWrap.find('.menu > li');
        var hamburger = $('#hamb');
        if( isTablet || isMobile){
            $('.submenu').hide();
            menuTrigger.off('click');
            hamburger.off('click');

            menuTrigger.on('click', function(ev){
                var submenu = $(this).children('.submenu');
                if(submenu.length === 0) return;

                ev.preventDefault();
                submenu.slideToggle();
                $(this).children('a').toggleClass('is-active');
            })

            hamburger.on('click', function(){
                hamburger.toggleClass('is-active');
                menuWrap.slideToggle();
            })

        }else{
            $('.submenu').show();
            menuTrigger.off('click');
        }
    };

    var reviewsSlider = new Swiper('.js-reviews-slider', {
      
        pagination: {
          el: '.js-reviews-dots',
          bulletClass: 'slider-dots__bullet',
          bulletActiveClass: 'slider-dots__bullet_active',
          clickable: true
        },
        
    })
    var certificatesSlider = new Swiper('.js-certificates-slider', {
        pagination: {
            el: '.js-certificates-dots',
            bulletClass: 'slider-dots__bullet',
            bulletActiveClass: 'slider-dots__bullet_active',
            clickable: true
        },
        breakpoints: {
            1: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 33
            },
            991: {
                slidesPerView: 4
            }
        }
        
    })
    // ************* init spot animation *************
    var radius = 8;
    TweenMax.staggerFromTo('.blob', 5 ,{
        cycle: {
            attr:function(i) {
                var r = i*90;
                return {
                    transform:'rotate('+r+') translate('+radius+',0.1) rotate('+(-r)+')'
                }
            }
        }
    },{
        cycle: {
            attr:function(i) {
                var r = i*90+360;
                return {
                    transform:'rotate('+r+') translate('+radius+',0.1) rotate('+(-r)+')'
                }
            }
        },
        ease:Linear.easeNone,
        repeat:-1
    });
    // **************************************

    updateDevice();
    menuInit();

    $(window).on('resize', function(){
        updateDevice();
        menuInit()
    });

})
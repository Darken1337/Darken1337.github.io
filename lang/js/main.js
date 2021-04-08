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

    var newsSlider = {
        sliderHeight: 0,
        instance: null,
        updateHeight: function(){
            var sliderHeight = 0;
            $('.news-card').each(function(index){
                if(index > 2) return;
                sliderHeight += $(this).height();
            })
            this.sliderHeight = sliderHeight;
        },
        init: function(){
            this.updateHeight()
            $('.js-news-slider').css('height', this.sliderHeight);

            if(this.instance !== null){
                this.instance.destroy();
                this.instance = null;
            }
            this.instance = new Swiper('.js-news-slider', {
                slidesPerView: 'auto',
                direction: 'vertical',
                pagination: {
                    el: '.js-news-dots',
                    bulletClass: 'slider-dots__bullet',
                    bulletActiveClass: 'slider-dots__bullet_active',
                    clickable: true
                }
            })
        }
    }

    var gallerySlider = new Swiper('.js-gallery-slider', {
        navigation: {
            nextEl: '.gallery__next',
            prevEl: '.gallery__prev',
        },
        pagination: {
            el: '.js-gallery-dots',
            bulletClass: 'slider-dots__bullet',
            bulletActiveClass: 'slider-dots__bullet_active',
            clickable: true
        }
    })

    var teachersSlider = new Swiper('.js-teachers-slider', {
        navigation: {
            nextEl: '.teachers-slider__next',
            prevEl: '.teachers-slider__prev',
            clickable: true
        },
        breakpoints: {
            1: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            992: {
                slidesPerView: 2,
                spaceBetween: 18
            }
        }
    })

    window.onload = function(){
        newsSlider.init();

    }
    
    var tabsInit = function(){
        var tabsTrigger = $('[data-tab-open]');

        tabsTrigger.on('click', function(ev){
            ev.preventDefault();
            var tabId             = $(this).attr('data-tab-open');
            var container         = $(this).parents('[data-tab-container]');
            var currentTabTrigger = container.find('[data-tab-open].is-active');
            var currentTab        = container.find('[data-tab].is-active');
            var tabTriggerToOpen  = $(this);
            var tabToOpen         = container.find('[data-tab="' + tabId + '"]');

            currentTabTrigger.removeClass('is-active');

            tabTriggerToOpen.addClass('is-active');

            currentTab.hide()
                      .removeClass('is-active');
            tabToOpen.fadeIn()
                     .addClass('is-active');
        })
    }

    tabsInit();
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
        menuInit();
    });

})
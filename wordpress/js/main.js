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

$('[data-tab-open]').on('click', function(){
    var numberToOpen = $(this).attr('data-tab-open');
    if(numberToOpen === undefined) return;
    var elToOpen = $('[data-tab="' + numberToOpen + '"]');
    if(elToOpen.length === 0) return;
    $('[data-tab].is-active').removeClass('is-active');
    $('[data-tab-open].is-active').removeClass('is-active');
    $(this).addClass('is-active');
    elToOpen.addClass('is-active');
})

$('.js-partners-slider').slick({
    slidesToShow: 1,
    arrows: false,
    dots: true,
    appendDots: $('.partners__dots')
})

var animateCSS = function(node, animation){
    const animationName = 'animate__' + animation;
    console.log(node);

    node.classList.add('animate__animated', animationName);

    // function handleAnimationEnd() {
    //   node.classList.remove('animate__animated', animationName);
    //   node.removeEventListener('animationend', handleAnimationEnd);
    // }

    // node.addEventListener('animationend', handleAnimationEnd);
}

var isDesktop = $(window).width() > 1024;

var scrollInit = {
    current: 0,
    direction: null,
    sections: $('[data-section]'),
    max: $('[data-section]').length - 1,
    slider: $('.home-slider'),
    animate: function(){
        var prev = null;
        var currentSlide = this.sections[this.current];
        if(this.direction)prev = this.sections[this.current + this.direction];
        var currentVideo = currentSlide.querySelector('[data-video]');
        
        if(prev){
            var prevVideo = prev.querySelector('[data-video]');
            this.toggleAnimation(prev);
            prev.classList.remove('is-current');
            if(prevVideo){
                this.toggleVideo(prevVideo);
            }
        }
        console.log(currentSlide);
        this.toggleAnimation(currentSlide);
        currentSlide.classList.add('is-current');
        
        if(currentVideo){
            this.toggleVideo(currentVideo);
        }

        if(this.current === 0){
            $('#header').removeClass('is-active');
        }else{
            $('#header').addClass('is-active');
        }
    },
    toggleVideo: function(video){
        if(! video) return;

        if (video.paused) video.play(); 
        else {
            setTimeout(function(){
                video.pause();
                video.currentTime = 0;
            }, 1000);
        }
    },
    scroll: function(){
        this.current -= this.direction;
        this.validateDirection();
        this.validateCurrent();
        this.animate();
    },
    toggleAnimation(rootEl){
        var elements = rootEl.querySelectorAll('[data-animation]');
        elements.forEach(function(el){
            console.log(el);
            if(! el.classList.contains('animate__animated')){
                animateCSS(el, $(el).attr('data-animation'));
            }else{
                el.classList.remove('animate__animated', 'animate__' + $(el).attr('data-animation'));
            }
        }) 
    },
    validateCurrent: function(){
        if(this.current < 0) this.current = 0;
        if(this.current > this.max) this.current = this.max;
    },
    validateDirection: function(){
        if(Math.abs(this.direction) !== 1) this.direction = -1;
    },
    init: function(){
        if(isDesktop){
            var _this = this;
            var timeout = null;
            this.sections[0].classList.add('is-current');
            $(this.slider).bind('mousewheel', function(e){
                if(timeout === null){
                    _this.direction = e.deltaY;
                    _this.scroll();
                    timeout = setTimeout(function(){
                        timeout = null;
                    }, 1000);
                }
            })
        }
    }
}

var preloader = {
    start: function(){
        var el = document.querySelector('#logo');
        var myAnimation = new LazyLinePainter(el, {
            "ease":"easeLinear",
            "strokeWidth":90,
            "strokeOpacity":1,
            "strokeColor":"#272155",
            "strokeCap":"butt"
        }); 
        
        setTimeout(() => {
            myAnimation.paint();  
            setTimeout(function(){
                $('.preloader').css('background-color', 'transparent');
                $('.preloader__logo').addClass('is-animated');
                
                document.querySelector('[data-video="1"]').play();

                setTimeout(function(){

                    if(isDesktop){
                        $('[data-animation]').removeClass('pre-animate');
                        scrollInit.toggleAnimation(document.querySelector('#header'));
                        scrollInit.toggleAnimation(document.querySelector('[data-section="0"]'));
                    }
            
                    $('.nav__logo').css('visibility', 'visible')
                    $('.preloader').hide(0);
                }, 500);


            }, 3000);
        }, 1);
    }
};
$(document).ready(function(){
    if(isDesktop){
        $('[data-animation]').addClass('pre-animate');
    }
    preloader.start();
    scrollInit.init();
})

if(!isDesktop){
    $(document).on('scroll', function(){

        if(window.pageYOffset > 100){
            $('#header').addClass('is-active')
        }else if(! $('#header').hasClass('is-active')){
            $('#header').removeClass('is-active')
        }
        checkVideo();
    })
}

function checkVideo(){
    var media = $('video').not("[autoplay='autoplay']");
    var tolerancePixel = 40;
    // Get current browser top and bottom
    var scrollTop = $(window).scrollTop() + tolerancePixel;
    var scrollBottom = $(window).scrollTop() + $(window).height() - tolerancePixel;

    media.each(function(index, el) {
        var yTopMedia = $(this).offset().top;
        var yBottomMedia = $(this).height() + yTopMedia;

        if(scrollTop < yBottomMedia && scrollBottom > yTopMedia){ //view explaination in `In brief` section above
            $(this).get(0).play();
        } else {
            $(this).get(0).pause();
        }
    });
}

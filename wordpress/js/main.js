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
    autoplay: true,
    adaptiveHeight: true,
    autoplaySpeed: 5000,
    dots: true,
    appendDots: $('.partners__dots')
})

var isDesktop = $(window).width() > 1024;

function playVideo(video){
    if(! video) return;
    if (video.paused) video.play(); 
}

function pauseVideo(video){
    if( ! video.paused) {
        setTimeout(function(){
            video.pause();
            video.currentTime = 0;
        }, 1000);
    }
}

function toggleAnimation(rootEl){
    if(rootEl.length === 0) return;
    var elements = rootEl[0].querySelectorAll('[data-animation]');
    
    for(var i = 0; i < elements.length; i++){
        var el = elements[i];
        if(el.classList.contains('animate__animated')){
            el.classList.remove('animate__animated','animate__' + el.getAttribute('data-animation'));
        }else{
            el.classList.add('animate__animated','animate__' + el.getAttribute('data-animation'));
        }
    }
}

if($(window).width() > 1024){
    var prev = 0;

    var scrollify = $.scrollify({
        section : "[data-section]",
        interstitialSection : "",
        easing: "linear",
        scrollSpeed: 1000,
        offset : 0,
        scrollbars: true,
        setHeights: false,
        overflowScroll: false,
        updateHash: false,
        touchScroll:false,
        before:function(next,sections) {
            var nextEl = sections[next];
            var nextVideo = nextEl.find('[data-video]');

            var prevEl = sections[prev];
            var prevVideo = prevEl.find('[data-video]');

            // prevVideo.removeClass('is-current')
            $('[data-section].is-current').removeClass('is-current');
            nextEl.addClass('is-current');
            console.log(`prev: ${prev}: current: ${next}`);

            if(prev !== 0 && prevEl.length !== 0) toggleAnimation(prevEl)
            if(next !== 0 && nextEl.length !== 0) toggleAnimation(nextEl);

            if(nextVideo.length > 0){
                playVideo(nextVideo[0]);
            }
            if(prevVideo.length > 0){
                pauseVideo(prevVideo[0]);
            }

            if(next === 0){
                $('#header').removeClass('is-active');
            }else{
                $('#header').addClass('is-active');
            }
        },
        after:function(next, sections) {
            prev = next;
        }
    });
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
                $('.preloader').addClass('is-hidden');
                        
                $('.preloader__logo').addClass('is-animated');

                setTimeout(function(){
                    $('[data-animation]').removeClass('pre-animate');

                    var currentEl = $.scrollify.current();
                    if(currentEl && currentEl.length > 0){
                        prev = parseInt(currentEl.attr('data-section'));
                        var currentVideo = currentEl.find('[data-video]');

                        toggleAnimation($('#header'));
                        toggleAnimation(currentEl);

                        $('[data-section].is-current').removeClass('is-current');
                        currentEl.addClass('is-current')

                        if(currentVideo.length > 0){
                            playVideo(currentVideo[0]);
                        }
                    }
                    
                    $('.nav__logo').css('visibility', 'visible')

                    if(prev > 0){
                        $('#header').addClass('is-active')
                    }else if($('#header').hasClass('is-active')){
                        $('#header').removeClass('is-active')
                    }

                }, 500);
            }, 1500);
        }, 1);
    }
};

$(document).ready(function(){
    if(isDesktop && $('[data-section]').length > 0){
        $('[data-animation]').addClass('pre-animate');
    }
    if(isDesktop){
        var video = document.querySelector('[data-video="1"]');
        video.load();
        video.oncanplay = function(){
            preloader.start();
            video.oncanplay = null;
        }
    }else{
        preloader.start();
    }
    // if(isDesktop){
    //     $("video.js-delay source").each(function() {
    //         var sourceFile = $(this).attr("data-src");
    //         $(this).attr("src", sourceFile);
    //         var video = this.parentElement;
    //         video.load();
    //     });
    // }
})


$(document).on('scroll', function(){

    if(window.pageYOffset > 100){
        $('#header').addClass('is-active')
    }else if($('#header').hasClass('is-active')){
        $('#header').removeClass('is-active')
    }
    if(!isDesktop){
        checkVideo();
    }
})

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
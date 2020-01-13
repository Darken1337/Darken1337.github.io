function fillPlaceholders(width, height) {
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+width+' '+height+'"%3E%3C/svg%3E'
}

$('img.js-lazy').each(function(){

    var imgWidth = $(this).attr('width'),
        imgHeight = $(this).attr('height'),
        calculatedWidth = fillPlaceholders(imgWidth, imgHeight)

    $(this).attr('src', calculatedWidth)
})


$(document).ready(function(){

    var lazyLoadInstance = new LazyLoad({
        elements_selector: ".js-lazy",
        threshold: 500,
        class_loading: 'js-lazyloading'
    });


    $('#toggle-menu').on('click', function () {

        $(this).toggleClass('js-open');
        $('#header').toggleClass('js-active');
        $('#menu-main').slideToggle(200);

    })

    $('#tabs-controls .js-tab').on('click', function () {

        var imgCurrentSrc = $(this).find('img').attr('src'),
            largeSrc = $(this).find('img').attr('data-tab-large'),
            mainTab = $('#tab-picked'),
            mainTabSrc = mainTab.attr('src');

        console.log(largeSrc, mainTabSrc != imgCurrentSrc );
        

        if (mainTabSrc != imgCurrentSrc) {
            $('.js-tab-active').removeClass('js-tab-active')
            $(this).addClass('js-tab-active')
            mainTab.attr('src', imgCurrentSrc);
            mainTab.attr('data-large', largeSrc)
        }
    })
   
    $("#menu-main a, [data-smooth]").on('click', function (event) {

        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;

            if($('#toggle-menu').hasClass('js-open')){
                $('#toggle-menu').removeClass('js-open');
                $('#header').removeClass('js-active');
                $('#menu-main').slideUp(200);
                $('body').removeClass('hidden')
            }

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            },{
                duration: 2000,
                easing: "swing"
            },
            function () {
                window.location.hash = hash;
            });
        } 
    });

    if($(window).width() > 992){
        $('#tab-picked').imagezoomsl({

            zoomrange: [3, 3]
        });
    }else{
        $("#tab-picked").imagezoomsl({

            innerzoommagnifier: true,
            classmagnifier: window.external ? window.navigator.vendor === "Yandex" ? "" : "round-loupe" : "",
            magnifierborder: "5px solid #F0F0F0",                               // fix для Opera, Safary, Yandex		  
            zoomrange: [2, 8],
            zoomstart: 4,
            magnifiersize: [150, 150]	
        });
    }
        

})
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

        if (mainTabSrc != imgCurrentSrc) {
            $('.js-tab-active').removeClass('js-tab-active')
            $(this).addClass('js-tab-active')
            mainTab.attr('src', imgCurrentSrc);
            mainTab.attr('data-zoom', largeSrc)
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

    $('#tab-picked').hover(function(){
        $('.plan-tabs__scale').removeClass('is-hidden');
    },function(){
        $('.plan-tabs__scale').addClass('is-hidden');
    })

    if(document.querySelector('#tab-picked')){
        new Drift(document.querySelector('#tab-picked'), {
            paneContainer: document.querySelector('.plan-tabs__scale'),
            inlinePane: 992,
            containInline: true,
            hoverBoundingBox: true
        });
    }


})

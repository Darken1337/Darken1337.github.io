$(document).ready(function(){

    var lazyLoadInstance = new LazyLoad({
        elements_selector: ".js-lazy",
        threshold: 500,
        class_loading: 'js-lazyloading'
    });

    $('#toggle-menu').on('click', function(){

        $(this).toggleClass('js-open');
        $('#header').toggleClass('js-active');
        $('#menu-main').slideToggle(200);
        $('body').toggleClass('hidden')

    })

    $('#tabs-controls .js-tab').on('click', function(){

        var imgCurrentSrc = $(this).find('img').attr('src'),
            mainTab = $('#tab-picked'),
            mainTabSrc = mainTab.attr('src');

        if (mainTabSrc != imgCurrentSrc){
            $('.js-tab-active').removeClass('js-tab-active')
            $(this).addClass('js-tab-active')
            mainTab.attr('src', imgCurrentSrc)
        }
    })

    $(document).ready(function () {
        $("#menu-main a, [data-smooth]").on('click', function (event) {

            if (this.hash !== "") {
                event.preventDefault();
                var hash = this.hash;

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
    });

})
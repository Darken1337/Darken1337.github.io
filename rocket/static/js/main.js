$(document).ready(function(){

    var lazyLoadInstance = new LazyLoad({
        elements_selector: ".js-lazy"
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
            $(this).removeClass('js-tab-active')
            mainTab.attr('src', imgCurrentSrc)
        }

        

    })

    // function checkMenuVisiblity(){
    //     if ($(window).width() <= 768) {
    //         $('#menu-main').hide()
    //     } else {
    //         $('#menu-main').show()
    //     }
    // }
    // checkMenuVisiblity()

    // $(window).on('resize', function(){
    //     checkMenuVisiblity()
    // })

})
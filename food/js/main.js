jQuery(document).ready(function(){
    $('.js-toggle-search').on('click', function(){
        $('body').toggleClass('o-hidden');
        $('#search').slideToggle(200);
    })
    $('.js-menu-close').on('click', function(){
        $('body').removeClass('o-hidden');
        $('#menu').fadeOut(200);
    })
    $('.js-menu-open').on('click', function(){
        $('#menu').fadeIn(200);
        $('body').addClass('o-hidden')
    })
    $('[data-tab-open]').on('click', function(){
        var tabIdToOpen = $(this).attr('data-tab-open');
        var elementToOpen = $('[data-tab="' + tabIdToOpen + '"]');

        if(elementToOpen.length > 0){
            $('[data-tab-open].is-active').removeClass('is-active');
            $(this).addClass('is-active');
            $('[data-tab]').hide(0);
            elementToOpen.show(0);
        }
    })
})
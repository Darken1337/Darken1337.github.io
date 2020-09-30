$(document).ready(function($){

    // Menu toggler
    $(document).on('click', '.Header_hamburgerButton__3_38Q, .HamburgerButton_active__1_PQi, .Header_dimmer__1zBLT', function(){

        if($('.Header_root__YpDmX').hasClass('Header_expandable__1ohaI')){
            setTimeout(function(){
                $('.Header_root__YpDmX').removeClass('Header_expandable__1ohaI');
            }, 100);
        }else{
            $('.Header_root__YpDmX').addClass('Header_expandable__1ohaI');
        }

        if($('.Header_root__YpDmX').hasClass('Header_expanded__1kE2V')){
            $('.Header_root__YpDmX').removeClass('Header_expanded__1kE2V');
        }else{
            setTimeout(function(){
                $('.Header_root__YpDmX').addClass('Header_expanded__1kE2V');
            }, 100);
        }


        $('.Nav_root__19qLL').toggleClass('Nav_vertical__3apmo');

        $('.Button_root__GQFRI').toggleClass('Button_regular__L1YqV')
                                .toggleClass('Button_link__3230x')
                                .toggleClass('UserActions_link__2brQV');
    })

    // slider init
    if($.hasOwnProperty('slick')){
        $('.Slider_root__2SDh-').slick({
            slidesToShow: 4,
            dots: true,
            arrows: false,
            dotsClass: 'Slider_dots__23Rsx',
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        })
    }

    //footer drodowns
    $('.Footer_subtitle__366Hy').on('click', function(){
        $(this).parents('.Footer_block__3ibZT').toggleClass('Footer_blockExpanded__1rH1Y')
    })

    //footer show-more
    $('.Footer_seoButton__2lEwY').on('click', function(){
        $(this).parents('.Footer_seo__2JLmq').addClass('Footer_seoExpanded__3f6ZE');
        $(this).remove();
    })

    // Scroll top
    $('.js-scroll-top').on('click', function(){
        $("html, body").animate({ scrollTop: 0 }, 400);
    })

    // Help tabs
    $('[data-tab-open]').on('click', function(){
        var toOpen = $(this).attr('data-tab-open');
    
        var elToOpen = $('[data-tab="' + toOpen + '"]');

        $('[data-tab-open].HelpPage_navItemActive__2EIs9').removeClass('HelpPage_navItemActive__2EIs9')
        $(this).addClass('HelpPage_navItemActive__2EIs9');

        $('[data-tab].HelpPage_categoryActive__YZUEF').removeClass('HelpPage_categoryActive__YZUEF')
        elToOpen.addClass('HelpPage_categoryActive__YZUEF');

        $('[data-tab] .HelpPage_questionActive__2a0gV').removeClass('HelpPage_questionActive__2a0gV')
    })

    // Help accordeon
    $('.HelpPage_questionToggle__1buEW').on('click', function(){
        $(this).parents('.HelpPage_question__1MeAN').toggleClass('HelpPage_questionActive__2a0gV');
    })
    
})
jQuery(document).ready(function($){

    //Menu init

    var hamb = $('#toggle-menu'),
        menuWrap = $('#menu-main'),
        navigation = $('#nav');

    hamb.on('click', function(){

        $(this).toggleClass('active');
        menuWrap.toggleClass('active');
        $('body').toggleClass('o-hidden');
        navigation.toggleClass('active');

    })

    //smooth scroll

    $('a[data-section]').on('click', function(e){

        e.preventDefault();

        var scrollToId = $(this).attr('data-section'),
            scrollToOffsetTop = $('#' + scrollToId ).offset().top;

        $('html, body').animate({
            scrollTop: scrollToOffsetTop
        }, 400, 'linear')

        if(menuWrap.hasClass('active')){

            menuWrap.removeClass('active');
            navigation.removeClass('active');
            $('body').removeClass('o-hidden');
            hamb.removeClass('active');

        }

    })

    //Vertical menu

    var verticalMenuInit = {
        breakpoints: [
            {
                section: $('#s-banner'),
                offsetTop: $('#s-banner').offset().top
            },
            {
                section: $('#s-about'),
                offsetTop: $('#s-about').offset().top
            },
            {
                section: $('#s-services'),
                offsetTop: $('#s-services').offset().top
            },
            {
                section: $('#s-footer'),
                offsetTop: $('#s-footer').offset().top
            }
        ],
        checKWindowHeight: function(){

            var windowOffset = window.pageYOffset,
                currentSection = {};

            for (let i = 0; i < this.breakpoints.length; i++) {
                
                if(windowOffset <= this.breakpoints[i].offsetTop ){
                    
                    currentSection = this.breakpoints[i];

                    break;
                }
            }

            var id = currentSection.section.attr('id');

            $('a[data-section].active').removeClass('active');

            $('a[data-section="' + id + '"]').addClass('active');
            

        }
    }

    $(document).on('scroll', function(){

        verticalMenuInit.checKWindowHeight();
        
    })

})
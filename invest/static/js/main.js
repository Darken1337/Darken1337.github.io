$(document).ready(function(){

    var button = $('#button-fixed');

    var buttonFixedInit = function(){

        if ($(this).scrollTop() > $('#s-banner').outerHeight()) {
            button.addClass('fixed')
        } else {
            button.removeClass('fixed')
        }

    }

    $(window).on('resize', function(){

        if($(window).width() <= 850){
            $(window).on('scroll', function () {

                buttonFixedInit()

            })
            
        }else{
            $(window).off('scroll');
            button.removeClass('fixed')
        }

    })

    


})
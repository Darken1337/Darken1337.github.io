$(document).ready(function(){
    
    //Modals
    var modalsInit = {
        fadeTime: 400,
        currentModal: null,
        overlay: $('.modal-overlay'),
        openModal: function(modalId){
    
            var modalToOpen = $('#' + modalId);
    
            this.currentModal = modalToOpen;
    
            this.overlay.fadeIn(this.fadeTime);
    
            modalToOpen.fadeIn(this.fadeTime);
    
            $('body').addClass('overflow-hidden');
    
    
        },
        closeModal: function(){
    
            if(this.currentModal != null){
                this.currentModal.fadeOut(this.fadeTime);
                this.overlay.fadeOut(this.fadeTime);
                $('body').removeClass('overflow-hidden');
            }
    
        }
    }
    
    $('[data-modal]').on('click', function(){
    
        var modalId = $(this).attr('data-action');
    
        modalsInit.openModal(modalId)
    
    })
    
    
    $('[data-action="close-modal"]').on('click', function(){
    
        modalsInit.closeModal()
    
    })

    //Маска для телефона
    $('[data-mask="phone"]').mask('+380?(99)999-99-99', {autoclear: false});
    

    //Меню мобильное
    $('#hamb').on('click', function(){

        $('#menu-mobile').addClass('is-active')

    })
    $('#close-menu').on('click', function(){

        $('#menu-mobile').removeClass('is-active')

    })

    //Слайдер

    if($(window).width() < 1024){
        var slick = $('.js-slider-testimonials').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            infinite: true,
            useCSS: true,
            useTransform: true,
            responsive: [
                {
                  breakpoint: 767,
                  settings: {
                      dots: true,
                      appendDots: $('.testimonials__dots')
                  }
                }
              ]
        });

        //setHeight to slider elements

        var slickElements = $('.testimonial'),
            elementHeights = [];

        slickElements.each(function(){

            elementHeights.push($(this).outerHeight());

        })

        var maxValue = Math.max.apply(null, elementHeights);

        slickElements.css('height', maxValue)
    }

})
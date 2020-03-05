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

        $('body').addClass('overflow-hidden');
        $('#menu-mobile').addClass('is-active')

    })
    $('#close-menu').on('click', function(){

        $('#menu-mobile').removeClass('is-active')
        $('body').removeClass('overflow-hidden');

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

var validator = {
    checkInputs: function(form){

        var inputs = form.find('input[data-required]'),
            errors = [];

        inputs.each(function(index){

            var type = $(this).attr('data-name'),
                value = $(this).val(),
                errorHolder = $(this).siblings('.error_info');

            if(value === ''){
                errors.push({
                    holder: errorHolder,
                    message: 'Заполните обязательное поле'
                })

                return true;
            }

            if(type === 'email' &&
                value !== ''){

                var regExpression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi;

                if(! regExpression.test(value)){
                    errors.push({
                        holder: errorHolder,
                        message: 'Введите корректный email'
                    })
                }

                return true;

            }
            
            if(type === 'phone' && 
                    value.length !== 17 &&
                    value !== ''){

                errors.push({
                    holder: errorHolder,
                    message: 'Введите корректный телефон'
                })

                return true;
            }

        })

        if(errors.length === 0){
            
            return true;

        }else{
            for (var i = 0; i < errors.length; i++) {

                this.renderErrors(errors[i]);
                
            }
            return false;
        }

    },
    renderErrors: function(error){
        error.holder.show();
        error.holder.text(error.message);

    }
}

$(".js-form-validate").submit(function(e) {
    
    if(! validator.checkInputs($(this))){
        e.preventDefault()
    }else {
        console.log('Done!')
    }
});

$('input[data-required]').on('input keydown', function(){

    var errorHolder = $(this).siblings('.error_info');

    if(errorHolder.length > 0){
        errorHolder.hide();
    }

})
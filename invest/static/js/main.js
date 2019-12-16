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

    var modalsInit = {
        currentModal: null,
        modalFade: 500,
        openModal: function (modal) {
            this.currentModal = modal;

            modal.fadeIn(this.modalFade)
            $('html').addClass('html-hidden');
        },
        closeModal: function () {

            this.currentModal.fadeOut(this.modalFade)
            $('html').removeClass('html-hidden');

            if(this.currentModal.attr('id') == 'gallery'){
                setTimeout(() => {
                    $('#lightbox-slider').slick('unslick');
                }, 500);
            }

            this.currentModal = null;
        }
    }

    $('[data-action="gallery"]').on('click', function(){
        setTimeout(() => {
            $('#lightbox-slider').slick({
                adaptiveHeight: true,
                prevArrow: '<button type="button" class="lightbox__button prev"></button>',
                nextArrow: '<button type="button" class="lightbox__button next"></button>'
            })
        }, 100);
        
    })

    $('[data-modal]').on('click', function(){

        var modalId = $(this).attr('data-action');
            modal = $('#' + modalId)

        modalsInit.openModal(modal)

    })

    $('.modal-wrap').on('click', function(e){

        modalsInit.closeModal()

    })

    $('[data-action="close-modal"]').on('click', function(e){

        modalsInit.closeModal()

    })

    $('.modal-window').on('click', function(e){

        e.stopPropagation()

    })



})
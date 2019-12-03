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
            $('body').addClass('hidden');
        },
        closeModal: function () {

            this.currentModal.fadeOut(this.modalFade)
            $('body').removeClass('hidden');

            this.currentModal = null;
        }
    }

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
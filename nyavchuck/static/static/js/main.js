$(document).ready(function(){

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

    $('[data-mask="phone"]').mask('+380?(99)999-99-99', {autoclear: false});

})
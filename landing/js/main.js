jQuery(function(){
    var modals = {
        body: null,
        shadow: null,
        currentModal: null,
        duration: 200,
        openModal: function(modalId){
            var modal = $('#' + modalId);
            if(modal.length === 0) return;

            this.currentModal = modal;
            this.shadow.fadeIn(this.duration);
            modal.fadeIn(this.duration);
            body.addClass('o-hidden');
        },
        closeModal: function(){
            if(this.currentModal === null ) return;
            this.currentModal.fadeOut(this.duration);
            this.currentModal = null;
            this.shadow.fadeOut(this.duration);
            this.body.removeClass('o-hidden');
        },
        init: function(){
            var _this = this;
            this.shadow = $('.shadow');
            this.body = $('body');

            $('[data-modal]').on('click', function(){
                _this.openModal($(this).attr('data-action'));
            })
            $('.modal-window').on('click', function(){
                _this.closeModal();
            })
            $('.modal-window__inner').on('click', function(ev){
                ev.stopPropagation();
            })
            $('[data-action="close-modal"], .shadow').on('click', function(){
                _this.closeModal();
            })
        }
    }

    modals.init();
})
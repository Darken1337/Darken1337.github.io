$('.js-post-single-slider').slick({
    slidesToShow: 3,
    infinite: true,
    appendArrows: $('.blog-post-slider__controls'),
    prevArrow: '<button type="button" class="blog-post-slider__arrow prev"><i class="icon-arrow-down"></i></button>',
    nextArrow:  '<button type="button" class="blog-post-slider__arrow next"><i class="icon-arrow-down"></i></button>',
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2
            }
        }
    ]
})

$('input').on('focus', function(){
    var parent = $(this).parents('.js-input-control');
    if(parent.length === 0) return;
    parent.addClass('is-focused');
})

$('input').on('blur', function(){
    var parent = $(this).parents('.js-input-control');
    if(parent.length === 0) return;
    parent.removeClass('is-focused');
})

$('.js-hamb').on('click', function(){
    $('#menu').fadeToggle(200);
    $('#menu-mask').fadeToggle(200);
    $(this).toggleClass('is-active');
    $('body').toggleClass('is-hidden');
})

$('#menu-mask').on('click', function(){
    $('#menu').fadeOut(200);
    $('#menu-mask').fadeOut(200);
    $('.js-hamb').removeClass('is-active');
    $('body').removeClass('is-hidden');
})

var modals = {
    shadow: $('.shadow'),
    body: $('body'),
    currentModal: null,
    openModal: function(modalId){
        var modalToOpen = $('#' + modalId);
        if(modalToOpen.length > 0){
            modalToOpen.fadeIn();
            this.currentModal = modalToOpen;
            this.shadow.fadeIn();
            this.body.addClass('o-hidden');
        }
    },
    closeModal: function(){
        if(this.currentModal !== null){
            $(this).currentModal = null;
            $(this).currentModal.fadeOut();
            this.shadow.fadeOut();
            this.body.removeClass('o-hidden');
        }
    }
}

$(document).on('click', '[data-modal]', function(){
    modals.openModal($(this).attr('[data-action]'));
})
$(document).on('click', '[data-action="modal-close"], .shadow', function(){
    modals.closeModal();
})
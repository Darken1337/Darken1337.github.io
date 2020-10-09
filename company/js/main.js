jQuery(document).ready(function($){
    $('.hamb').on('click', function(){
        $(this).toggleClass('is-active');
        $('#menu').toggleClass('is-active')
    })
    $('.js-banner-bg-slider').slick({
        arrows: false,
        asnavFor: '.banner-slider'
    })
    $('.banner-slider').slick({
        arrows: false,
        dots: true,
        appendDots: $('.banner-slider-dots'),
        asNavFor: '.js-banner-bg-slider'
    })
    $('.js-portfolio-bg-slider').slick({
        arrows: false,
        asnavFor: '.portfolio-slider'
    })
    $('.portfolio-slider').slick({
        arrows: true,
        prevArrow: '<button type="button" class="portfolio-slider__arrow prev"></button>',
        nextArrow: '<button type="button" class="portfolio-slider__arrow next"></button>',
        dots: false,
        asNavFor: '.js-portfolio-bg-slider'
    })
    $('.js-gallery-controls [data-src]').on('click', function(){
        var potfolioItem = $(this).parents('.portfolio-item');
        var mainGallery = potfolioItem.find('.js-gallery-main');
        potfolioItem.find('.js-gallery-controls [data-src].is-active').removeClass('is-active');
        $(this).addClass('is-active');
        // add gallery big image
        mainGallery.find('img').attr('src', $(this).attr('data-src'));

        // Stop animation
        mainGallery.removeClass('is-animating');
        mainGallery.addClass('is-animating');
        setTimeout(() => {
            mainGallery.removeClass('is-animating');
        }, 400);
    })

    var modals = {
        currentModal: null,
        openModal: function(modal){
            if(modal.length === 0) return;
            $('body').addClass('o-hidden');
            $('.shadow').fadeIn(200);
            modal.fadeIn(200);
            this.currentModal = modal;
        },
        closeModal: function(){
            $('body').removeClass('o-hidden');
            $('.shadow').fadeOut(200);
            if(this.currentModal === null) return;

            this.currentModal.fadeOut(200);
            this.currentModal = null;
        },
        init: function(){
            var _this = this;
            $('[data-modal]').on('click', function(){
                var modalId = $(this).attr('data-action');
                if(modalId){
                    _this.openModal($('#' + modalId))
                }
            });
            $('[data-action="modal-close"], .shadow').on('click', function(){
                _this.closeModal();
            })
        }
    }

    modals.init();

})
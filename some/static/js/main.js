jQuery(document).ready(function($){

    svg4everybody()

    $('.natural-gallery__item').imagesLoaded(function(){

        $('#natural-gallery').masonry({
            itemSelector: '.natural-gallery__item',
        })

    })

    var galleryInit = {
        currentImage: null,
        modalContext: null,
        transition: 200,
        getImgSrc: function(){

            return this.modalContext.find('img').attr('src')

        },
        openImage: function(){

            this.currentImage = this.getImgSrc();
            $('#gallery-modal').fadeIn(this.transition)
            $('#gallery-modal img').attr('src', this.currentImage)
            $('.shadow').fadeIn(this.transition)
            $('body').addClass('hidden')

        },
        closeImage: function(){

            $('#gallery-modal').fadeOut(this.transition)
            $('.shadow').fadeOut(this.transition)
            $('body').removeClass('hidden')

        },
        nextGalleryImage: function(){

            var next = this.modalContext.next();

            if(next.length == 1){
                this.modalContext = next;
            }else{
                this.modalContext = $('#natural-gallery .natural-gallery__item').first()
            }

            this.currentImage = this.getImgSrc()

        },
        prevGalleryImage: function(){

            var prev = this.modalContext.prev()
            
            if (prev.length == 1) {
                this.modalContext = prev;
            } else {
                this.modalContext = $('#natural-gallery .natural-gallery__item').last()
            }

            this.currentImage = this.getImgSrc()

        }
    }

    $('#natural-gallery .natural-gallery__item').on('click', function(){

        galleryInit.modalContext = $(this)
        galleryInit.openImage()

    })


    $('#gallery-modal').on('click', function(e){

        if(e.target == $(this)[0]){
            galleryInit.closeImage()
        }

    })

    $('#next, .gallery-modal__item').on('click', function(e){
        
        galleryInit.nextGalleryImage()
        galleryInit.openImage()

    })

    $('#prev').on('click', function(e){
        e.stopPropagation()

        galleryInit.prevGalleryImage()
        galleryInit.openImage()

    })

    const tabsInit = {
        currentTab: 1,
        setCurrentTab: function(val){

            this.currentTab = val;

        },
        openTab: function(){

            if (window.pageYOffset > 100) {
                $([document.documentElement, document.body]).animate({
                    scrollTop: 0
                }, 50, 'linear');
            }

            this.setButtonsState()

            if(this.currentTab != 'tab-0'){
                $(`#${this.currentTab}`).fadeIn(300)
            }

            if(this.currentTab == 'tab-2'){
                $('#banner-image').hide(0)
                $('[data-tab="tab-4"]').hide(0)
                $('#button-main').fadeOut(300)
            }else{
                $('#banner-image').fadeIn(100)
                $('[data-tab="tab-4"]').fadeIn(300)
                $('#button-main').fadeIn(300)
            }

        },
        hideTab: function(){

            $(`#${this.currentTab}`).hide(0)

        },
        setButtonsState: function(){
            $('[data-tab]').removeClass('current-page')
            if(this.currentTab != 'tab-4'){
                $(`[data-tab="${this.currentTab}"]`).addClass('current-page')
                $('#banner-image').removeClass('moved')
                $("#tab-4").removeClass('active')
            }else{
                setTimeout(() => {
                    $("#tab-4").addClass('active')
                }, 1);
            
                $('#banner-image').addClass('moved')
            }
        }
    }

    $('[data-tab]').on('click', function(){

        tabsInit.hideTab()
        tabsInit.setCurrentTab($(this).attr('data-tab')) 
        tabsInit.openTab()

    })


})
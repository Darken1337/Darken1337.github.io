jQuery(document).ready(function($){

    svg4everybody()

    $('.natural-gallery__item').imagesLoaded(function(){

        $('#natural-gallery').masonry({
            itemSelector: '.natural-gallery__item',
        })

    })

    

})
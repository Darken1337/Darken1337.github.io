jQuery(document).ready(function($){

    svg4everybody();


    //search toggler
    $('#open-search').on('click', function(){

        $('#search-block').toggleClass('active');
        $('#s-header').toggleClass('active');

    })

    $('#close-search').on('click', function(){

        $('#search-block').removeClass('active');
        $('#s-header').removeClass('active');

    })

    //latest toggler

    $('#show-latest').on('click', function(){

        $('#latest-body').slideToggle(200);

        $(this).toggleClass('active');

    })

    $('#open-menu').on('click', function(){

        $('#menu-main').slideToggle(200);
        $('#menu-main').toggleClass('active');
        $(this).toggleClass('active');
        $('#search-block').removeClass('active');
        $('#s-header').removeClass('active');
    
    })
    
    if($(window).width() <= 1024){
        $(document).on('click', function(e){
    
            if($(e.target).attr('id') !== 'menu-main' && 
                $(e.target).parents('#menu-main').length === 0 && 
                $(e.target).attr('id') !== 'open-menu' &&
                $(e.target).parents('#open-menu').length === 0){
                $('#menu-main').hide(0);
                $('#menu-main').removeClass('active');
                $(this).removeClass('active');
            }
        
        })
    }

    $('#scroll-left').on('click', function(){

        var currentScroll = $('#menu-category-list').scrollLeft();
        
            $('#menu-category-list').animate({
                scrollLeft: currentScroll + 100
            })
        
    })

})


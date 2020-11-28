$(document).ready(function(){

    if($(window).width() < 768){
        $('#menu a').on('click', closeMenu)
        $('#hamb').on('click', function(){
            $(this).toggleClass('is-active');
            $('#menu').slideToggle(300);
        })
    
        $(document).on('click', function(ev){
            var target = ev.target;
    
            if(! target.closest('#hamb') && ! target.closest('#menu')){
                closeMenu();
            }
        })
    }

    function closeMenu(){
        $('#hamb').removeClass('is-active');
        $('#menu').hide();
    }
    
})
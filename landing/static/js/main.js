jQuery(document).ready(function($){

    $('[data-accordeon="open"]').on('click', function(){

        var body = $(this).parents('[data-accordeon="item"]')
                    .find('[data-accordeon="body"]')

        $(this).toggleClass('active');
        body.slideToggle(200);

    })

})
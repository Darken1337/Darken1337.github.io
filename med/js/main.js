svg4everybody();

var menuDropInit = {
    openMenu: function(menu){

        var drops = $('[data-dropdown="body"]');

        drops.hide(0);

        menu.fadeIn(0);

    },
    init: function(){

        var initiators = $('[data-dropdown="open"]'),
            openMain = $('[data-dropdown="open-main"]'),
            bodyMain = $('[data-dropdown="body-main"]')
            overlay = $('.overlay'),
            _this = this;

        initiators.on('mouseenter', function(){

            var dropToOpen = $(this).children('[data-dropdown="body"]');

            _this.openMenu(dropToOpen);

            initiators.removeClass('active');

            $(this).addClass('active');

        })

        openMain.on('mouseenter', function(){

            var dropToOpen = $(this).children('[data-dropdown="body-main"]');

            _this.openMenu(dropToOpen);

            $(this)
            .css('z-index', parseInt(overlay.css('z-index')) + 1)
            .addClass('active');

            overlay.fadeIn(0);

        })

        
        overlay.on('mouseenter', function(){

            bodyMain.hide(0);
            $(this).hide(0);

            openMain.css('z-index', 1)
                    .removeClass('active');
            

        })
    }
}


menuDropInit.init();
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

            openMain.removeClass('active');

            $('[data-dropdown="body-main"]').hide();

            var dropToOpen = $(this).children('[data-dropdown="body-main"]');

            if(dropToOpen.length > 0){
                _this.openMenu(dropToOpen);

                $(this).addClass('active');
    
                var dropOffset = $(window).width() - (dropToOpen.offset().left + dropToOpen.width());
                
                //container width
                if(dropOffset < 0){
                    dropToOpen.addClass('lefter');
                }
    
                overlay.fadeIn(0);
            }else{
                overlay.hide();
            }

        })

        
        overlay.on('mouseenter', function(){

            bodyMain.hide(0);
            $(this).hide(0);

            openMain.removeClass('active');
            
        })

        $('.middle-header-wrap, .header-top-wrap').on('mouseenter', function(){
            bodyMain.hide(0);
            overlay.hide(0);

            openMain.removeClass('active');
        })
    }
}

menuDropInit.init();

//filter drop init

var dropdownInit = {
    toggleItem: function(item){

        item.slideToggle(200);
        item.toggleClass('active');

    },
    init: function(){

        var dropInitButtons = $('[data-accordeon="open"]'),
            _this = this;

        dropInitButtons.on('click', function(){

            var dropToToggle = $(this).siblings('[data-accordeon="body"]');

            _this.toggleItem(dropToToggle);

        })
    }
}

dropdownInit.init();

// Modals

var modalsInitGlobal = {
    shadow: $('.shadow'),
    currentModal: null,
    modalContext: null,
    notToFade: [],
    modalFade: 500,
    staticIds: [],
    addStatic: function(id){
        if(this.staticIds.indexOf(id) === -1){
            this.staticIds.push(id);
        }
    },
    removeStatic: function(){
        const indexOfStatic = this.staticIds.indexOf(id);
        if(indexOfStatic !== -1){
            this.staticIds.splice(indexOfStatic, 1);
        }
    },
    openModal: function (modal) {
        this.currentModal = modal;

        const zIndexModal = this.currentModal.css('z-index');

        modal.addClass('active');

        if(this.notToFade.indexOf(
            this.currentModal.attr('id')
        ) === -1){
            modal.fadeIn(this.modalFade);
        }

        this.shadow.fadeIn(this.modalFade);
        this.shadow.css('z-index', zIndexModal - 1);
        $('body').addClass('hidden');

    },
    closeModal: function () {
        if(this.currentModal != null &&
            this.staticIds.indexOf(this.currentModal.attr('id')) === -1){

            if(this.notToFade.indexOf(
                this.currentModal.attr('id')
            ) === -1){
                this.currentModal.fadeOut(this.modalFade);
            }

            this.currentModal.removeClass('active');

            let modals = $('.modal-window').filter(function(){
                    return $(this).hasClass('active');
                }),
                modalsLength = modals.length;

            if(modalsLength > 0){
                this.currentModal = modals.last();
                const zIndexModal = this.currentModal.css('z-index');
                this.shadow.css('z-index', zIndexModal - 1);
            }else{
                $('body').removeClass('hidden');
                this.shadow.fadeOut(this.modalFade);
                this.currentModal = null;
            }
        }

    },
    checkModalById: function(id){

        return !!(this.currentModal && this.currentModal.attr('id') == id);

    },
    init: function(){
        $(document).on('click', '[data-modal]', function () {

            let modalId = $(this).attr('data-action');

            modalsInitGlobal.modalContext = $(this);

            modalsInitGlobal.openModal(
                $('#' + modalId)
            )

        })

        $(document).on('keydown', function (e) {
            if (e.which === 27 && modalsInitGlobal != null) {

                const additionalOptions = $('.additional_option').filter(function(){

                    return $(this).css('right') == '-1px';

                })

                if (additionalOptions.length > 0){
                    additionalOptions.animate({
                        right: '-100%'
                    })
                    additionalOptions.next().hide()
                }else{
                    modalsInitGlobal.closeModal()
                }

            }
        })

        $(document).on('click', '[data-action="close-modal"]', function () {

            modalsInitGlobal.closeModal()

        })

        $('.shadow').on('mousedown', function () {
            modalsInitGlobal.closeModal()
        })

    }
}

modalsInitGlobal.init();

// Price range picker

var slider = document.getElementById('price-picker');

if(slider){
    noUiSlider.create(slider, {
        start: [+$('#start-price').val(), +$('#end-price').val()],
        step: 1,
        behaviour: 'drag',
        connect: true,
        tooltips: true,
        format: {
            to: function ( value ) {
              return value;
            },
            from: function ( value ) {
              return value.replace(',-', '');
            }
          },
        range: {
            'min': parseInt($('#start-price').val()),
            'max': parseInt($('#end-price').val())
        }
    });

    var elements = [
        document.getElementById('start-price'), // 0
        document.getElementById('end-price')  // 1
    ];
    
    // Display the slider value and how far the handle moved
    // from the left edge of the slider.
    slider.noUiSlider.on('update', function (values, handle, unencoded, isTap, positions) {
        elements[handle].value = values[handle]
    });

    elements.forEach(function (input, handle) {

        input.addEventListener('change', function () {
            slider.noUiSlider.setHandle(handle, this.value);
        });
    
        input.addEventListener('keydown', function (e) {
    
            var values = slider.noUiSlider.get();
            var value = Number(values[handle]);
    
            // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
            var steps = slider.noUiSlider.steps();
    
            // [down, up]
            var step = steps[handle];
    
            var position;
    
            // 13 is enter,
            // 38 is key up,
            // 40 is key down.
            switch (e.which) {
    
                case 13:
                    slider.noUiSlider.setHandle(handle, this.value);
                    break;
    
                case 38:
    
                    // Get step to go increase slider value (up)
                    position = step[1];
    
                    // false = no step is set
                    if (position === false) {
                        position = 1;
                    }
    
                    // null = edge of slider
                    if (position !== null) {
                        slider.noUiSlider.setHandle(handle, value + position);
                    }
    
                    break;
    
                case 40:
    
                    position = step[0];
    
                    if (position === false) {
                        position = 1;
                    }
    
                    if (position !== null) {
                        slider.noUiSlider.setHandle(handle, value - position);
                    }
    
                    break;
            }
        });
    });

}


// Tips

var tipController = {
    add: function(){

        var tipElement = $('[data-template="tip"]').clone(),
            container = $('[data-tip="wrap"]');

        tipElement.removeAttr('data-template');

        container.html('');

        container.append(tipElement);

        tipElement.fadeIn(200);

        setTimeout(() => {
            tipController.close(tipElement)
        }, 3000);

    },
    close: function(tip){
        tip.fadeOut(200, function(){
            tip.remove()
        })
    }
}

$(document).on('click', '[data-tip="add"]',function(){
    tipController.add();
})

$(document).on('click', '[data-tip="close"]', function(){
    var tipToClose = $(this).parents('[data-tip="item"]');

    tipController.close(tipToClose);
})

// menu-adaptive Dropdown

var menuDropdownMobile = {
    openChild: function(drop){
        drop.slideDown(200);
    },
    init: function(){

        var initiators = $('[data-menu="open"]'),
            _this = this;

        initiators.on('click', function(e){

            var dropToOpen = $(this).siblings('[data-menu="body"]');

            if(dropToOpen.length > 0 && ! $(this).hasClass('active')){

                $(this).addClass('active');
                _this.openChild(dropToOpen);

                e.preventDefault();
                
                
            }
        })
    }
}

$('#hamb').on('click', function(){

    $('#menu-adaptive').fadeIn(200);
    $('body').addClass('hidden');

})

$('#menu-close').on('click', function(){

    $('#menu-adaptive').fadeOut(200);
    $('body').removeClass('hidden');

})

menuDropdownMobile.init();




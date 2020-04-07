svg4everybody();


$('#open-catalogue').on('click', function(){

    $('#catalogue-body').toggle();
    $('.overlay').toggle();
    $(this).toggleClass('active');

})

$('[data-dropdown="open"]').on('mouseenter', function(){

    var dropToOpen = $(this).children('[data-dropdown="body"]'),
        nesting = $(this).parents('[data-dropdown="open"]').length + 2;

    $(this).siblings('.active').removeClass('active');
    $(this).siblings('[data-dropdown="open"]').find('[data-dropdown="open"].active').removeClass('active');

    $(this).siblings('[data-dropdown="open"]').find('[data-dropdown="body"]').hide(0);

    

    if(dropToOpen.length > 0){

        dropToOpen.show(0);
        $(this).addClass('active');
    }else{
        nesting--;
    }

    $('#catalogue-body .menu-dropdown__close').css('left', 'calc(' + (nesting * 100) + '%' + ' - (' + (nesting * 2) + 'px))')

})

$('.overlay').on('click', function(){
    $('#catalogue-body').hide();
    $('.overlay').hide();
    $('#open-catalogue').removeClass('active');
})

$('[data-catalogue="close"]').on('click', function(){
    $('#catalogue-body').hide();
    $('.overlay').hide();
    $('#open-catalogue').removeClass('active');

})
//filter drop init

var dropdownInit = {
    toggleItem: function(item){

        item.slideToggle(200);

    },
    init: function(){

        var dropInitButtons = $('[data-accordeon="open"]'),
            _this = this;

        dropInitButtons.on('click', function(){

            var dropToToggle = $(this).siblings('[data-accordeon="body"]');

            $(this).toggleClass('active');

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
    var sliderObj = noUiSlider.create(slider, {
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

$('[data-menu="open"]').on('click', function(){

    $('#menu-adaptive').fadeIn(200);
    $('body').addClass('hidden');

})

$('#menu-close').on('click', function(){

    $('#menu-adaptive').fadeOut(200);
    $('body').removeClass('hidden');

})

menuDropdownMobile.init();

// Menu sticky init

// function checkMenuSticky(){
//     var headerHeight = $('#s-header').outerHeight();

//     if(this.window.pageYOffset > headerHeight){
//         $('#menu-sticky').removeClass('menu-hidden');
//         if($('#menu-sticky [data-dropdown="open-main"].active').length === 0){
//             $('[data-dropdown="body-main"]').hide(0);
//             $('.overlay').hide(0);
    
//             $('[data-dropdown="open-main"]').removeClass('active');
//             $('[data-dropdown="open"]').removeClass('active');
//         }
        
//     }else{
//         $('#menu-sticky').addClass('menu-hidden');
//     }
// }

// checkMenuSticky();

// $(window).on('scroll', function(){

//     checkMenuSticky();

// })

// tabs init

var tabsController = function(){
    return {
        lastTab: null,
        firstTab: null,
        slideRight: null,
        slideLeft: null,
        list: null,
        wrap: null,
        showMore: null,
        step: 100,
        getStep: function(){
            return this.step;
        },
        slideRightAction: function(){
            
            var minus_left = this.getStep(),
                _this = this;
    
            if(this.list.width() + parseInt(this.list.css('left')) - this.wrap.width() < this.step){
                minus_left = this.list.width() + parseInt(this.list.css('left')) - this.wrap.width();
              }
              if( this.wrap.width() < this.list.width() + parseInt(this.list.css('left'))){
                this.list.animate({
                    left: parseInt(this.list.css('left')) - minus_left + 'px'
                }, 200, function(){
                    if( _this.wrap.width() >= _this.list.width() + parseInt(_this.list.css('left'))){
                        _this.container.removeClass('has-next');
                      }
                      if(parseInt(_this.list.css('left')) < 0){
                        _this.container.addClass('has-prev');
                      }
                })
              }else{
                if( this.wrap.width() >= this.list.width() + parseInt(this.list.css('left'))){
                    this.container.removeClass('has-next');
                  }
                  if(parseInt(this.list.css('left')) < 0){
                    this.container.addClass('has-prev');
                  }
              }
              
    
        },
        slideLeftAction: function(){
    
            var minus_left = -this.getStep(),
                _this = this;
    
            if(parseInt(this.list.css('left')) > -this.step){
                minus_left = parseInt(this.list.css('left'));
              }
    
            if(parseInt(this.list.css('left')) < 0){
                this.list.animate({
                    left: parseInt(this.list.css('left')) - minus_left + 'px'
                }, 200, function(){
                    _this.container.addClass('has-next');
                    if(parseInt(_this.list.css('left')) >= 0){
                        _this.container.removeClass('has-prev');
                        _this.container.addClass('has-next');
                    }
                })
            }else{
                if(parseInt(this.list.css('left')) >= 0){
                    this.container.removeClass('has-prev');
                    this.container.addClass('has-next');
                }
            }
            
        },
        showMoreAction: function(){
            if(this.container.attr('data-slides') === 'marks'){
                this.container.attr('data-slides', '')
                    .addClass('show-all');
                this.list.css('left','0');
                this.container.removeClass('has-prev')
                    .removeClass('has-next');
                this.showMore.html('Скрыть все');
    
              }else{
                this.container.attr('data-slides', 'marks')
                    .removeClass('show-all');
                this.showMore.html('Показать все')
                if(this.list.width() > this.wrap.width()){
                    this.container.addClass('has-next');
                }
              }
        },
        init: function(container, step){
    
            var _this = this;
    
            this.container = container;
    
            this.list = container.find('[data-slides="list"]');
            this.wrap = container.find('[data-slides="wrap"]')
    
            this.slideRight = container.find('[data-slides="slide-right"]');
            this.slideLeft = container.find('[data-slides="slide-left"]');
            this.showMore = container.find('[data-slides="show-more"]');
    
            if(this.list.width() > this.wrap.width()){
                this.container.addClass('has-next');
            }

            if(step){
                this.step = step;
            }
    
            if(this.showMore.length > 0){
                if(this.list.width() > this.wrap.width()){
                    this.showMore.show();
                }else{
                    this.showMore.hide();
                }
            }
    
            this.slideRight.on('click', function(){
    
                _this.slideRightAction();
                
            })
    
            this.slideLeft.on('click', function(){
    
                _this.slideLeftAction();
                
            })
    
            this.showMore.on('click', function(){
    
                _this.showMoreAction();
                
            })
        }
    }
}


$(document).ready(function(){
    var tagsSlider = new tabsController();
    var imgSlider = new tabsController();

    imgSlider.init($('[data-slides="imgs"]'), 113)

    tagsSlider.init($('[data-slides="marks"]'), 100)
})

$('[data-search="open"]').on('click', function(){

    $('[data-search="item"]').show();
    $('.search-overlay').show()

})

$('.search-overlay').on('click', function(){
    $('[data-search="item"]').hide();
    $(this).hide()
        .removeAttr('style');

})

$('#open-filter').on('click', function(){

    $('#filter').toggleClass('visible');

})

$('#close-filter').on('click', function(){

    $('#filter').removeClass('visible');

})
//Scrollable menu
var menu = $('[data-scroll="item"]');

menu.each(function(){

    var el = $(this);

    var wrap = el.parents('[data-scroll="wrap"]'),
        scrollTop = el.find('[data-scroll="top"]'),
        scrollBottom = el.find('[data-scroll="bottom"]');

    scrollTop.on('click', function(){

        var scrolledTop = el.scrollTop();

        el.animate({
            scrollTop: scrolledTop - 39
        })

        checkScroll()
        
    })

    el.on('scroll', function(){
        checkScroll()
    })

    scrollBottom.on('click', function(){

        var scrolledTop = el.scrollTop();

        el.animate({
            scrollTop: scrolledTop + 39
        })
        
        checkScroll()
        
    })


    checkScroll()

    function checkScroll(){
        var scrolled = el.scrollTop();

        if(scrolled === 0){
            scrollTop.hide()
        }else{
            scrollTop.show()
        }
        
        if(wrap.height() + scrolled === el.prop('scrollHeight')){
            scrollBottom.hide()
        }else{
            scrollBottom.show()
        }
    }

})
    

$('[data-type="add-basket"]').on('click', function(){

    if($(this).hasClass('active')){
        $(this).removeClass('active');
        $(this).text('В корзину');
        $(this).attr('title', 'В корзину');
    }else{
        $(this).addClass('active');
        $(this).text('В корзине');
        $(this).attr('title', 'Убрать из корзины');
    }

})

$('[data-cart="open"]').on('click', function(){

    $(this).siblings('[data-cart="body"]').toggle();

})

$('[data-cart="close"]').on('click', function(){

    $(this).parents('[data-cart="body"]').hide();

})

$(document).on('click', function(e){

    if(! $(e.target).attr('data-cart') &&
        $(e.target).parents('[data-cart]').length === 0)
        {
            $('[data-cart="body"]').hide();
        }


})

if($(window).width() < 1025){
    $('#catalogue-body .menu-dropdown__link').on('click', function(e){

        var dropToOpen = $(this).siblings('.menu-dropdown__child');

        if(dropToOpen.length > 0 && ! $(this).hasClass('active')){
            e.preventDefault();
            $(this).addClass('active');
            dropToOpen.slideDown(200);
        }
        
    })
}

$('[data-action="add-basket"]').on('click', function(){

    if($(this).hasClass('active')){
        $(this).text('В корзину')
        $(this).attr('title', 'В корзину')
    }else{
        $(this).text('В корзине');
        $(this).attr('title', 'Убрать из корзины')
    }
    $(this).toggleClass('active');

})

if(document.getElementById('compare-products')){
    var simpleBarCompareThumbs = new SimpleBar(document.getElementById('compare-products'),{
        autoHide: false
    });
    
    simpleBarCompareThumbs.getScrollElement().addEventListener('scroll', function(){
    
        $('[data-scroll="compare-sync"]').scrollLeft(this.scrollLeft);
    
    });
}

$('#filter input').on('change', function(){

    var offsetTop = $(this).offset().top - $('#filter').offset().top;

    $('#filter-tip').css('top', offsetTop).show();

})

sliderObj.on('update', function(){
    
    var offsetTop = $(sliderObj.target).offset().top - $('#filter').offset().top;

    $('#filter-tip').css('top', offsetTop).show();
})
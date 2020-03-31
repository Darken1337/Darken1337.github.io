jQuery(document).ready(function($){

    var dropdownController = {
        open: function(drop){
            drop.slideDown(200);
        },
        closeAll: function(){
            $('[data-drop="open"].active').removeClass('active');
            $('[data-drop="body"]').hide()
        },
        close: function(drop){
            drop.slideUp(200);

            drop.find('[data-drop="body"]').hide();
            drop.find('[data-drop="open"]').removeClass('active');
        },
        init: function(){

            var initiators = $('[data-drop="open"]'),
                _this = this;

            initiators.on('click', function(){

                var dropToOpen = $(this).siblings('[data-drop="body"]');

                if(! $(this).hasClass('active')){
                    _this.open(dropToOpen);
                }else{
                    _this.close(dropToOpen);
                }

                $(this).toggleClass('active');

            })

            $(document).on('click', function(e){

                if($(e.target).parents('[data-drop]').length === 0 &&
                ! $(e.target).attr('data-drop')){
                    _this.closeAll();
                }

            })

        }
    }

    dropdownController.init();


    if($(window).width() < 768){
        $('.categories__wall').slick({
            nextArrow: '<button type="button" class="categories__wall-arrow next"><svg><use xlink:href="./img/sprites.svg#arrow-right"></use></svg></button>',
            prevArrow: '<button type="button" class="categories__wall-arrow prev"><svg><use xlink:href="./img/sprites.svg#arrow-right"></use></svg></button>',
        });
    }

    $('.banner-slider').slick({
        nextArrow: '<button type="button" class="banner-slider__arrow next"><svg><use xlink:href="./img/sprites.svg#arrow-right"></use></svg></button>',
        prevArrow: '<button type="button" class="banner-slider__arrow prev"><svg><use xlink:href="./img/sprites.svg#arrow-right"></use></svg></button>',
        dots: true,
        appendDots: $('.banner-slider-dots')
    });

    $('#open-menu').on('click', function(){

        $(this).toggleClass('active');

        $('#menu-main').toggleClass('active');

        $('body').toggleClass('hidden');

        $('.menu-overlay').toggle();

        $('#open-delivery').removeClass('active');

        $('#modal-delivery').hide(0);

        $('.overlay-delivery').hide(0)

        if($(this).hasClass('active')){
            $('#menu-main [data-menu="open"].active').removeClass('active');

            $('#menu-main [data-menu="body"]').hide(200);
        }

    })

    $('#open-delivery').on('click', function(){

        $(this).toggleClass('active');
        $('#modal-delivery').fadeToggle(200);
        $('.overlay-delivery').fadeToggle(200);

        $('body').removeClass('hidden');
        $('#menu-main').removeClass('active');
        $('.menu-overlay').hide();
        $('#open-menu').removeClass('active');

    })

    $('.overlay-delivery, #close-delivery').on('click', function(){

        $('#open-delivery').removeClass('active');
        $('#modal-delivery').fadeOut(200);
        $('.overlay-delivery').fadeOut(200);

    })

    if($(window).width() < 1025){
        $('[data-menu="open"]').on('click', function(e){

            if(! $(this).hasClass('active')){

                e.preventDefault();

                $('[data-menu="open"].active').removeClass('active');

                $(this).addClass('active');

                $('[data-menu="body"]').slideUp(200);

                $(this).siblings('[data-menu="body"]').slideDown(200);
            }
        })

        $('.menu-overlay').on('click', function(){
            $(this).fadeOut(200);

            $('#menu-main').removeClass('active');

            $('#open-menu').removeClass('active');

            $('body').removeClass('hidden');

            $('#menu-main [data-menu="open"].active').removeClass('active');

            $('#menu-main [data-menu="body"]').hide(200);
        })
    }

    var priceCounter = {
        countPlus: function(value){

            value = parseInt(value);

            if(isNaN(value)){
                value = 1;
            }else{
                value++;
            }

            return value;
        },
        countMinus: function(value){

            value = parseInt(value);

            if(isNaN(value) || value <= 1){
                value = 1;
            }else{
                value--;
            }

           

            return value;
        },
        countPrice: function(input){

            var price = input.attr('data-price'),
                quantity = input.val();

            return (price * quantity).toFixed(2);

        },
        init: function(){

            var _this = this;

            $('[data-count="input"]').on('input', function(){

                $(this).val(
                    $(this).val().replace(/[^0-9]/gi, '')
                )
                

                var priceHolder = $(this).parents('[data-count="wrap"]').find('[data-price="total"]');
                

                if(priceHolder.length > 0){
                    var priceToSet = _this.countPrice($(this));

                    priceHolder.text(priceToSet);
                }

            })
            $('[data-count="plus"]').on('click', function(){

                var priceHolder = $(this).parents('[data-count="wrap"]').find('[data-price="total"]'),
                    input = $(this).siblings('[data-count="input"]');

                var qunatity = _this.countPlus(input.val());

                input.val(qunatity);

                input.css('width',((input.val().length + 1) * 8) + 'px' );

                if(priceHolder.length > 0){
                    var priceToSet = _this.countPrice(input);

                priceHolder.text(priceToSet);
                }

            })
            $('[data-count="minus"]').on('click', function(){

                var priceHolder = $(this).parents('[data-count="wrap"]').find('[data-price="total"]'),
                    input = $(this).siblings('[data-count="input"]');

                var qunatity = _this.countMinus(input.val());

                input.val(qunatity);

                input.css('width',((input.val().length + 1) * 8) + 'px' );

                if(priceHolder.length > 0){
                    var priceToSet =_this.countPrice(input);

                    priceHolder.text(priceToSet);
                }

            })

        }
    }

    priceCounter.init();




})
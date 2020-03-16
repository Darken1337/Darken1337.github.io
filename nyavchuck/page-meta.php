<?php 

use Carbon_Fields\Container;
use Carbon_Fields\Field;

add_action( 'carbon_fields_register_fields', 'crb_attach_page_main_options' );

function crb_attach_page_main_options() {
    Container::make( 'post_meta', __( 'Поля главной секции' ) )
            ->add_fields( array( 
                Field::make( 'text', 'banner_title', 'Заголовок главной секции' )
                     ->set_default_value('WELL KNOWN AGENCY'),
                Field::make( 'text', 'banner_subtitle', 'Подзаголовок главной секции' )
                     ->set_default_value('ЗАЩИТА РЕПУТАЦИИ В СЕТИ ИНТЕРНЕТ'),
                Field::make( 'text', 'banner_text', 'Текст главной секции' )
                     ->set_default_value('Агентство полного цикла по защите вашей репутации'),
             ) )
             ->show_on_template('page-templates/page-main.php');

    Container::make( 'post_meta', __( 'Поля секции о нас' ) )
            ->add_fields( array( 
                Field::make( 'text', 'about_title', 'Заголовок секции о нас' )
                     ->set_default_value('НЕМНОГО О WELL KNOWN AGENCY'),
                Field::make( 'rich_text', 'about_text', 'Текст секции о нас' ),
                Field::make( 'image', 'about_image', 'Картинка справа от текста' )
                      ->set_value_type( 'id' )
             ) )
             ->show_on_template('page-templates/page-main.php');

    Container::make( 'post_meta', __( 'Поля сервисов' ) )
            ->add_fields( array( 
                Field::make( 'textarea', 'services_title', 'Заголовок секции сервисов' )
                    ->set_default_value('<span class="color-blue">НАШИ</span> УСЛУГИ'),
                Field::make( 'textarea', 'services_text', 'Текст секции сервисов' )
                    ->set_default_value('Сначала мы работаем с вашей репутацией, потом репутация наботает на вас'),
                Field::make( 'complex', 'services_items', 'Услуги' )
                    ->add_fields( array(
                        Field::make( 'textarea', 'services_item_title', 'Заголовок услуги' ),
                        Field::make( 'rich_text', 'services_item_features', 'Текст услуги' ),
                        Field::make( 'image', 'services_item_bg', 'Фон карточки услуги' ),

                    ))
             ) )
             ->show_on_template('page-templates/page-main.php');

}
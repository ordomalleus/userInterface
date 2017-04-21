var elixir = require('laravel-elixir');
require('laravel-elixir-html-minify');

//выключаем мапы
elixir.config.sourcemaps = false;

/**
 * Конфиг сборки Elixir
 */
elixir(function (mix) {
  //подключаем библиотеки
  mix.scripts([
    "./src/js/angular.min.js",
    "./src/js/angular-animate.min.js",
    "./src/js/angular-aria.min.js",
    "./src/js/angular-messages.min.js",
    "./src/js/angular-material.min.js"
  ], "./public/js/libs/angular-full.js");

  //подключаем модули приложения
  mix.scripts([
    //модуль service
    "./src/js/app/service/service.module.js",
    "./src/js/app/service/serviceFactory.factory.js",
    "./src/js/app/service/servicePaging.directive.js",
    //модуль list
    "./src/js/app/list/list.module.js",
    "./src/js/app/list/list.config.js",
    "./src/js/app/list/listDetailed.component.js",
    "./src/js/app/list/listOperations.component.js",
    "./src/js/app/list/listBalance.component.js",
    "./src/js/app/list/listUser.component.js",
    //модуль form
    "./src/js/app/form/form.module.js",
    "./src/js/app/form/formContent.component.js",
    //модуль application
    "./src/js/app/application/application.module.js",
    "./src/js/app/application/headerApplication.component.js",
    "./src/js/app/application/menuApplication.component.js",
    //главный модуль
    "./src/js/app/app.js"
  ], "./public/js/app/app.js");

  //подключаем css
  mix.styles([
    './src/css/bootstrap.min.css',
    './src/css/angular-material.css'
    ],
    './public/css/libs/libs.min.css'
  );
  //компилируем scss
  mix.sass(['./src/css/scss/app.scss'], './public/css/app.css');

  //компилируем главный html
  mix.html('index.html', './public', './src', {quotes: true, loose: false, empty: true});
  //компилируем шаблоны компонентов
  mix.html('**/*.html', './public/js/app/template', './src/js/app/', {quotes: true, loose: false, empty: true});

  //копируем файлы
  mix.copy(['./src/css/img/**.*'], 'public/css/img');
});
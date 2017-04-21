(function (angular) {
  'use strict';
  angular.module('App', [
    'ngMaterial',
    'Application',
    'List',
    'Form'
  ])
    .controller('AppCtrl', AppCtrl)
    .config(AppConfig);

  /**
   * инжект зависимостей конфига
   * @type {Array}
   */
  AppConfig.$inject = ['$mdThemingProvider'];

  /**
   * Конфиг модуля для цветной палитры
   * @param $mdThemingProvider
   * @constructor
   */
  function AppConfig($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .accentPalette('teal', {
        'default': '500',
        'hue-1'  : '100',
        'hue-2'  : '700',
        'hue-3'  : 'A400'
      });
  }

  /**
   * Конструктор контроллера
   * @constructor
   */
  function AppCtrl() {
    var vm = this;

    /**
     * Модель контроллера
     */
    vm.model = {
      section: {                                                    //выбранная вкладка
        list: {active: true},
        form: {active: false}
      }
    }
  }
})(window.angular);
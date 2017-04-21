(function (angular) {
  'use strict';
  angular.module('Application')
    .component('headerApplication', {
      bindings   : {},
      templateUrl: '/js/app/template/application/headerApplication.template.html',
      controller : headerApplicationCtrl
    });

  /**
   * инжект зависимостей
   * @type {Array}
   */
  headerApplicationCtrl.$inject = [];

  /**
   * Конструктор компоненты
   */
  function headerApplicationCtrl() {

  }

})(window.angular);
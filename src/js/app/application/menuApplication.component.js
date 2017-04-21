(function (angular) {
  'use strict';
  angular.module('Application')
    .component('menuApplication', {
      bindings   : {
        tabMenu: "="
      },
      templateUrl: '/js/app/template/application/menuApplication.template.html',
      controller : menuApplicationCtrl
    });

  /**
   * инжект зависимостей
   * @type {Array}
   */
  menuApplicationCtrl.$inject = [];

  /**
   * Конструктор компоненты
   */
  function menuApplicationCtrl() {
    var vm = this;

    /**
     * Функции компоненты
     */
    vm.selectSection = selectSection;

    activate();

    function activate() {
    }

    /**
     * Установка нужной вкладки
     * @param section
     */
    function selectSection(section) {
      for (var k in vm.tabMenu) {
        if (section == k) {
          vm.tabMenu[k].active = true;
        } else {
          vm.tabMenu[k].active = false;
        }
      }
    }
  }

})(window.angular);
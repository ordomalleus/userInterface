(function (angular) {
  'use strict';
  angular.module('List')
    .component('listDetailed', {
      bindings   : {
        userObj   : '=',
        callbackFn: '&'
      },
      templateUrl: '/js/app/template/list/listDetailed.template.html',
      controller : listDetailedCtrl
    });

  /**
   * инжект зависимостей
   * @type {Array}
   */
  listDetailedCtrl.$inject = ['serviceFactory', '$mdDialog', '$mdToast'];

  /**
   * Конструктор компоненты
   */
  function listDetailedCtrl(serviceFactory, $mdDialog, $mdToast) {
    var vm = this;

    vm.offDialog      = offDialog;
    vm.saveFormDialog = saveFormDialog;

    /**
     * Модель компонента
     */
    vm.model = {
      isSave : false,                                         //Происходило ли сохранение юзера или нет
      loadPut: false                                          //Показ загрузки
    };

    activate();

    function activate() {

      //покажем форму
      $mdDialog.show({
        contentElement     : '#showDialogFormDetailed',
        parent             : angular.element(document.body),
        clickOutsideToClose: true
      }).catch(function () {
        //вызовем при закрытии диалогового окна
        vm.callbackFn({result: {showDetailed: false, isSave: vm.model.isSave}});
      })
    }

    /**
     * Закрытие модалки через крестик
     */
    function offDialog() {
      $mdDialog.cancel();
    }

    /**
     * Сохранение данных юзера
     */
    function saveFormDialog() {
      vm.model.loadPut = true;

      serviceFactory.putUsers(vm.userObj)
        .then(function (data) {
          vm.model.isSave  = true;
          vm.model.loadPut = false;
          //формируем для показа Toast
          $mdToast.show(
            $mdToast.simple()
              .textContent('Сохранение:')
              .position('top start')
              .action('УСПЕШНО')
              .parent(angular.element(document.getElementById('showDialogFormDetailed')))
          );
        })
        .catch(function (error) {
          vm.model.loadPut = false;
          //формируем для показа Toast
          $mdToast.show(
            $mdToast.simple()
              .textContent('Сохранение:')
              .position('top start')
              .action('НЕ УДАЧНО')
              .parent(angular.element(document.getElementById('showDialogFormDetailed')))
          );
          console.log(error)
        });
    }
  }

})(window.angular);

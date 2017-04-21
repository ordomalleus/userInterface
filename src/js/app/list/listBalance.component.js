(function (angular) {
  'use strict';
  angular.module('List')
    .component('listBalance', {
      bindings   : {
        userId    : '=',
        callbackFn: '&'
      },
      templateUrl: '/js/app/template/list/listBalance.template.html',
      controller : listBalanceCtrl
    });

  /**
   * инжект зависимостей
   * @type {Array}
   */
  listBalanceCtrl.$inject = ['serviceFactory', '$mdDialog', '$mdToast'];

  /**
   * Конструктор компоненты
   */
  function listBalanceCtrl(serviceFactory, $mdDialog, $mdToast) {
    var vm = this;

    vm.offDialog      = offDialog;
    vm.setBalanceUser = setBalanceUser;

    /**
     * Модель компонента
     */
    vm.model = {
      amount : 0,
      comment: 'любой комент',

      loadPut: false,                                               //статус загрузки
      isSave : false                                                //статус успешного сохранения
    };

    activate();

    function activate() {

      //покажем форму
      $mdDialog.show({
        contentElement     : '#showDialogFormBalance',
        parent             : angular.element(document.body),
        clickOutsideToClose: true
      }).catch(function () {
        //вызовем при закрытии диалогового окна
        vm.callbackFn({result: {showBalance: false, isSave: vm.model.isSave}});
      });
    }

    /**
     * Закрытие модалки через крестик
     */
    function offDialog() {
      $mdDialog.cancel();
    }

    /**
     * Получаем операции пользователя
     */
    function setBalanceUser() {
      vm.model.loadPut = true;

      serviceFactory.setBalanceUser(vm.userId, vm.model.amount, vm.model.comment)
        .then(function (data) {
          vm.model.loadPut = false;

          if (data.status === 200){
            vm.model.isSave = true;
            //формируем для показа Toast
            $mdToast.show(
              $mdToast.simple()
                .textContent('Пополнение:')
                .position('top start')
                .action('УСПЕШНО')
                .parent(angular.element(document.getElementById('showDialogFormBalance')))
            );
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

})(window.angular);

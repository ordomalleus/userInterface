(function (angular) {
  'use strict';
  angular.module('List')
    .component('listOperations', {
      bindings   : {
        userId    : '=',
        callbackFn: '&'
      },
      templateUrl: '/js/app/template/list/listOperations.template.html',
      controller : listOperationsCtrl
    });

  /**
   * инжект зависимостей
   * @type {Array}
   */
  listOperationsCtrl.$inject = ['serviceFactory', '$mdDialog'];

  /**
   * Конструктор компоненты
   */
  function listOperationsCtrl(serviceFactory, $mdDialog) {
    var vm = this;

    vm.offDialog = offDialog;
    vm.getTransactionsUser = getTransactionsUser;

    /**
     * Модель компонента
     */
    vm.model = {
      transactions      : [],                                           //массив операций
      datetimeFrom      : null,                                         //начальная дата операций
      datetimeTo        : null,                                         //конечная дата операций
      transactionType   : null,                                         //тип операции
      transactionTypeArr: [                                             //масив для селекта с выбором операций
        {
          id   : null,
          label: 'Не выбран'
        },
        {
          id   : 'payment',
          label: 'Оплата'
        },
        {
          id   : 'coupon',
          label: 'Купон'
        },
        {
          id   : 'inGamePurchase',
          label: 'Покупка в игре'
        },
        {
          id   : 'internal',
          label: 'Внутренний'
        },
        {
          id   : 'cancellation',
          label: 'Отмена'
        }
      ],

      loadPut: false
    };

    activate();

    function activate() {

      //покажем форму
      $mdDialog.show({
        contentElement     : '#showDialogFormOperations',
        parent             : angular.element(document.body),
        clickOutsideToClose: true
      }).catch(function () {
        //вызовем при закрытии диалогового окна
        vm.callbackFn({result: false});
      });

      //Установим первичное значение даты
      //TODO: с датой возникли проблемы, я всегда работал с timestamp, на скорую руку сделал так, не очень красиво но работает
      (function () {
        var datetimeTo = new Date();
        datetimeTo.setHours(23);
        datetimeTo.setMinutes(59);
        datetimeTo.setSeconds(59);
        datetimeTo.setMilliseconds(999);
        vm.model.datetimeTo = datetimeTo;

        var datetimeFrom = new Date();
        datetimeFrom.setHours(0);
        datetimeFrom.setMinutes(0);
        datetimeFrom.setSeconds(0);
        datetimeFrom.setDate(datetimeFrom.getDate() - 7);
        vm.model.datetimeFrom = datetimeFrom;
      })();
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
    function getTransactionsUser() {
      vm.model.loadPut = true;

      serviceFactory.getTransactionsUser(vm.userId, vm.model.datetimeFrom, vm.model.datetimeTo, vm.model.transactionType)
        .then(function (data) {
          vm.model.loadPut      = false;
          vm.model.transactions = data.data
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

})(window.angular);

(function (angular) {
  'use strict';
  angular.module('Form')
    .component('formContent', {
      bindings   : {},
      templateUrl: '/js/app/template/form/formContent.template.html',
      controller : formContentCtrl
    });

  /**
   * инжект зависимостей
   * @type {Array}
   */
  formContentCtrl.$inject = ['serviceFactory', '$mdToast'];

  /**
   * Конструктор компоненты
   */
  function formContentCtrl(serviceFactory, $mdToast) {
    var vm = this;

    vm.submit = submit;

    vm.model = {
      user_id    : '',
      user_name  : '',
      user_custom: '',
      email      : ''
    };

    activate();

    function activate() {

    }

    /**
     * Добавление юзера с формы
     */
    function submit() {
      serviceFactory.addUser(vm.model.user_id, vm.model.user_name, vm.model.user_custom, vm.model.email)
        .then(function (data) {
          //если нет ответа то все ОК
          if (data.data === '') {
            $mdToast.show(
              $mdToast.simple()
                .textContent('Добавление пользователя:')
                .position('top start')
                .action('УСПЕШНО')
            );
          } else {
            $mdToast.show(
              $mdToast.simple()
                .textContent('Добавление пользователя: ' + data.data.message)
                .position('top start')
                .action('НЕ УДАЧНО')
            );
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }

})(window.angular);
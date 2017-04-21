(function (angular) {
  'use strict';
  angular.module('List')
    .component('listUser', {
      bindings   : {},
      templateUrl: '/js/app/template/list/listUser.template.html',
      controller : listUserCtrl
    });

  /**
   * инжект зависимостей
   * @type {Array}
   */
  listUserCtrl.$inject = ['serviceFactory'];

  /**
   * Конструктор компоненты
   */
  function listUserCtrl(serviceFactory) {
    var vm = this;

    vm.getUsers        = getUsers;
    vm.showDetailsUser = showDetailsUser;
    vm.hideDetailed    = hideDetailed;
    vm.showOperations  = showOperations;
    vm.hideOperations  = hideOperations;
    vm.showBalance     = showBalance;
    vm.hideBalance     = hideBalance;
    vm.getNameUser     = getNameUser;
    vm.gotoPage        = gotoPage;

    /**
     * Модель компонента
     */
    vm.model = {
      prBar: true,                                              //Показ загрузки

      user     : [],                                            //Массив пользователей
      totalUser: 0,                                             //Общее колличество юзеров из ответа сервера
      offset   : 0,                                             //Отступ для запроса юзеров
      limit    : 10,                                            //Колличество юзеров за раз

      currentPage: 1,                                           //Текущая страница
      totalPage  : 0,                                           //Колличество страниц в пагинации

      showDetailed    : false,                                  //Показ формы с детальной информацией юзера и ее сохранение
      showDetailedUser: null,                                   //Копия объекта выбраного юзера для передачи в детальную информацию

      showOperations  : false,                                  //Показ формы операций
      showOperationsId: null,                                   //ID юзера для передачи в форму операций

      showBalance   : false,                                    //Показ формы баланса
      showBalancesId: null                                      //ID юзера для передачи в форму баланса
    };

    activate();

    function activate() {
      vm.getUsers(vm.model.offset, vm.model.limit);
    }

    /**
     * Запрос юзеров с API
     * @param offset
     * @param limit
     */
    function getUsers(offset, limit) {
      serviceFactory.getUsers(offset, limit)
        .then(function (data) {
          //получаем данные
          vm.model.user      = data['data']['data'];
          vm.model.totalUser = data['data']['recordsTotal'];
          //меняем статус загрузки
          vm.model.prBar     = false;
          //устанавливаем пагинацию
          _setPaging();
        })
        .catch(function (error) {
          console.log('Упс что то сломалось');
          console.log(error);
        })
    }

    /**
     * Показ формы редактирования юзера
     * @param user
     */
    function showDetailsUser(user) {
      //копируем объект для передачи в дочерний компонент
      vm.model.showDetailedUser = angular.copy(user);
      vm.model.showDetailed     = true;
    }

    /**
     * Закрытие формы редактирования юзера
     * @param result
     */
    function hideDetailed(result) {
      vm.model.showDetailed = result.showDetailed;
      //если произошло сохранение то загрузим данные по новой
      //хотя тут можно было вернуть измененый объект из дочернего компонента и заменть в родительском, но я сделал с перезагрузкой
      //или добавить обратную функцию которая загружает данные до закрытия диалогового окна
      //или скопировать передаваемый объект в нужный элемент массива
      if (result.isSave) {
        vm.gotoPage()
      }
    }

    /**
     * Показ формы операций юзера
     * @param id
     */
    function showOperations(id) {
      //копируем объект для передачи в дочерний компонент
      vm.model.showOperationsId = id;
      vm.model.showOperations   = true;
    }

    /**
     * Закрытие формы операций юзера
     * @param result
     */
    function hideOperations(result) {
      vm.model.showOperations = result;
    }

    function showBalance(id) {
      //копируем объект для передачи в дочерний компонент
      vm.model.showBalanceId = id;
      vm.model.showBalance   = true;
    }

    function hideBalance(result) {
      vm.model.showBalance = result.showBalance;
      if (result.isSave) {
        vm.gotoPage()
      }
    }

    /**
     * Установка имени в списке
     * @param name
     * @returns {string}
     */
    function getNameUser(name) {
      return name === null ? 'НЕТ ИМЕНИ' : name;
    }

    /**
     * Переход по пагинации
     */
    function gotoPage() {
      vm.model.prBar = true;
      _setPaging();
      if (vm.model.totalUser !== 0) {
        vm.getUsers(vm.model.offset, vm.model.limit);
      }
    }

    /**
     * Приватная функция для установки пагинации
     * @private
     */
    function _setPaging() {
      //получаем общее колличество страниц
      vm.model.totalPage = Math.ceil(vm.model.totalUser / vm.model.limit);
      //устанавлеваем offset для запроса в api
      vm.model.offset    = (vm.model.currentPage - 1) * vm.model.limit;
    }

  }

})(window.angular);
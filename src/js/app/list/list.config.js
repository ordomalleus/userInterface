(function (angular) {
  'use strict';
  angular.module('List')
    .config(ListConfig);

  ListConfig.$inject = ['$mdDateLocaleProvider'];

  function ListConfig($mdDateLocaleProvider) {
    $mdDateLocaleProvider.shortMonths = [
      'Янв', 'Фев', 'Мрт',
      'Апр', 'Май', 'Июн',
      'Июл', 'Авг', 'Сен',
      'Окт', 'Нбр', 'Дек'
    ];

    $mdDateLocaleProvider.shortDays = [
      'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'
    ];

    $mdDateLocaleProvider.firstDayOfWeek = 1;

    $mdDateLocaleProvider.formatDate = function (date) {
      var day   = date.getDate(),
          month = date.getMonth() + 1,
          year  = date.getFullYear();
      day       = day < 10 ? '0' + day : day;
      month     = month < 10 ? '0' + month : month;
      year      = year < 10 ? '0' + year : year;
      return day + '.' + month + '.' + year;
    };
  }
})(window.angular);
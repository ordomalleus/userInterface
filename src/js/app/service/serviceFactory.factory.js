(function (angular) {
  'use strict';

  /**
   * Фабрика для обмена с REST
   */
  angular.module('Service')
    .factory('serviceFactory', serviceFactory);

  /**
   * Инжект зависимостей модуля
   */
  serviceFactory.$inject = ['$http'];

  /**
   * Функция фабрики
   */
  function serviceFactory($http) {

    /**
     * URL базовый
     * @type {string}
     */
    var baseUrl = 'https://livedemo.xsolla.com/fe/test-task/baev/';

    /**
     * Публичные методы сервиса
     */
    var service = {
      getUsers           : getUsers,
      addUser            : addUser,
      putUsers           : putUsers,
      getTransactionsUser: getTransactionsUser,
      setBalanceUser     : setBalanceUser
    };

    return service;

    ///////////////////////////////////////////////

    /**
     * Получаем всех пользователей
     * @param offset
     * @param limit
     * @returns {*}
     */
    function getUsers(offset, limit) {
      return $http({
        method: 'GET',
        url   : baseUrl + 'users',
        params: {offset: offset, limit: limit}
      })
    }

    /**
     * Добавление юзера
     * @param user_id
     * @param user_name
     * @param user_custom
     * @param email
     * @returns {*}
     */
    function addUser(user_id, user_name, user_custom, email) {
      var result = {
        user_id: user_id
      };
      if (user_name) {
        result.user_name = user_name;
      }
      if (user_custom) {
        result.user_custom = user_custom;
      }
      if (email) {
        result.email = email;
      }

      return $http({
        method: 'POST',
        url   : baseUrl + 'users',
        data: result
      })
    }

    /**
     * Сохраняет новые значения пользователя
     * @param user
     * @returns {*}
     */
    function putUsers(user) {
      return $http({
        method: 'PUT',
        url   : baseUrl + 'users/' + user.user_id,
        data  : {
          user_name  : user.user_name,
          user_custom: user.user_custom,
          email      : user.email,
          enabled    : user.enabled
        }
      })
    }

    /**
     *
     * Получаем операции пользователя
     * @param id
     * @param dateFrom
     * @param dateTo
     * @param type
     * @returns {*}
     */
    function getTransactionsUser(id, dateFrom, dateTo, type) {
      //формируем параметры запроса
      var str = 'datetime_from=' + _formatDateGet(dateFrom);
      str += '&datetime_to=' + _formatDateGet(dateTo);
      if (type !== null) {
        str += '&transaction_type=' + type;
      }

      return $http({
        method: 'GET',
        url   : baseUrl + 'users/' + id + '/transactions?' + str
      })
    }

    /**
     * Добавляет на баланс
     * @param id
     * @param amount
     * @param comment
     * @returns {*}
     */
    function setBalanceUser(id, amount, comment) {
      return $http({
        method: 'POST',
        url   : baseUrl + 'users/' + id + '/recharge',
        data  : {
          amount : amount,
          comment: comment
        }
      })
    }

    /**
     * TODO: по стандарту миллисекунды могут быть и функция toISOString() выдает время с ними, но API его не принимает касяк в API
     * Преобразует дату в строку для get запросов без миллисекунд
     * @param date
     * @returns {string}
     * @private
     */
    function _formatDateGet(date) {

      var year   = date.getFullYear();
      var month  = date.getMonth() + 1;
      var day    = date.getDate();
      var hour   = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();

      function _addZero(str) {
        if (str < 10) {
          return '0' + str;
        }
        return str;
      }

      var result = _addZero(year) + '-' + _addZero(month) + '-' + _addZero(day) + 'T' + _addZero(hour) + ':' + _addZero(minute) + ':' + _addZero(second) + 'Z';
      result     = encodeURIComponent(result);

      return result;
    }
  }
})(window.angular);
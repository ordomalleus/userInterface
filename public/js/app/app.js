!function(t){"use strict";t.module("Service",[])}(window.angular),function(t){"use strict";function e(t){function e(e,n){return t({method:"GET",url:s+"users",params:{offset:e,limit:n}})}function n(e,n,o,a){var i={user_id:e};return n&&(i.user_name=n),o&&(i.user_custom=o),a&&(i.email=a),t({method:"POST",url:s+"users",data:i})}function o(e){return t({method:"PUT",url:s+"users/"+e.user_id,data:{user_name:e.user_name,user_custom:e.user_custom,email:e.email,enabled:e.enabled}})}function a(e,n,o,a){var i="datetime_from="+l(n);return i+="&datetime_to="+l(o),null!==a&&(i+="&transaction_type="+a),t({method:"GET",url:s+"users/"+e+"/transactions?"+i})}function i(e,n,o){return t({method:"POST",url:s+"users/"+e+"/recharge",data:{amount:n,comment:o}})}function l(t){function e(t){return t<10?"0"+t:t}var n=t.getFullYear(),o=t.getMonth()+1,a=t.getDate(),i=t.getHours(),l=t.getMinutes(),s=t.getSeconds(),r=e(n)+"-"+e(o)+"-"+e(a)+"T"+e(i)+":"+e(l)+":"+e(s)+"Z";return r=encodeURIComponent(r)}var s="https://livedemo.xsolla.com/fe/test-task/baev/",r={getUsers:e,addUser:n,putUsers:o,getTransactionsUser:a,setBalanceUser:i};return r}t.module("Service").factory("serviceFactory",e),e.$inject=["$http"]}(window.angular),function(){"use strict";function t(){return{restrict:"EA",scope:{wmpTotal:"=",position:"@",gotoPage:"&",step:"=",currentPage:"="},controller:e,controllerAs:"vm",template:['<div layout="row" class="wan-material-paging" layout-align="{{ position }}">','<md-button class="md-raised md-primary wmp-button" aria-label="First" ng-click="vm.gotoFirst()">{{ vm.first }}</md-button>','<md-button class="md-raised wmp-button" aria-label="Previous" ng-click="vm.getoPre()" ng-show="vm.index - 1 >= 0">...</md-button>','<md-button class="md-raised wmp-button" aria-label="Go to page {{i+1}}" ng-repeat="i in vm.stepInfo"',' ng-click="vm.goto(vm.index + i)" ng-show="vm.page[vm.index + i]" '," ng-class=\"{true: 'md-primary', false: ''}[vm.page[vm.index + i] === currentPage]\">"," {{ vm.page[vm.index + i] }}","</md-button>",'<md-button class="md-raised wmp-button" aria-label="Next" ng-click="vm.getoNext()" ng-show="vm.index + vm.step < wmpTotal">...</md-button>','<md-button class="md-raised md-primary wmp-button" aria-label="Last" ng-click="vm.gotoLast()">{{ vm.last }}</md-button>',"</div>"].join("")}}angular.module("Service").directive("wanMaterialPaging",t);var e=["$scope",function(t){var e=this;e.first="<<",e.last=">>",e.index=0,e.step=t.step,e["goto"]=function(n){t.currentPage=e.page[n]},e.getoPre=function(){t.currentPage=e.index,e.index-=e.step},e.getoNext=function(){e.index+=e.step,t.currentPage=e.index+1},e.gotoFirst=function(){e.index=0,t.currentPage=1},e.gotoLast=function(){e.index=parseInt(t.wmpTotal/e.step)*e.step,e.index===t.wmpTotal?e.index=e.index-e.step:"",t.currentPage=t.wmpTotal},t.$watch("currentPage",function(){t.gotoPage()}),t.$watch("wmpTotal",function(){e.init()}),e.init=function(){e.stepInfo=function(){var t,n=[];for(t=0;t<e.step;t++)n.push(t);return n}(),e.page=function(){var e,n=[];for(e=1;e<=t.wmpTotal;e++)n.push(e);return n}()}}]}(),function(t){"use strict";t.module("List",["Service"])}(window.angular),function(t){"use strict";function e(t){t.shortMonths=["Янв","Фев","Мрт","Апр","Май","Июн","Июл","Авг","Сен","Окт","Нбр","Дек"],t.shortDays=["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],t.firstDayOfWeek=1,t.formatDate=function(t){var e=t.getDate(),n=t.getMonth()+1,o=t.getFullYear();return e=e<10?"0"+e:e,n=n<10?"0"+n:n,o=o<10?"0"+o:o,e+"."+n+"."+o}}t.module("List").config(e),e.$inject=["$mdDateLocaleProvider"]}(window.angular),function(t){"use strict";function e(e,n,o){function a(){n.show({contentElement:"#showDialogFormDetailed",parent:t.element(document.body),clickOutsideToClose:!0})["catch"](function(){s.callbackFn({result:{showDetailed:!1,isSave:s.model.isSave}})})}function i(){n.cancel()}function l(){s.model.loadPut=!0,e.putUsers(s.userObj).then(function(e){s.model.isSave=!0,s.model.loadPut=!1,o.show(o.simple().textContent("Сохранение:").position("top start").action("УСПЕШНО").parent(t.element(document.getElementById("showDialogFormDetailed"))))})["catch"](function(e){s.model.loadPut=!1,o.show(o.simple().textContent("Сохранение:").position("top start").action("НЕ УДАЧНО").parent(t.element(document.getElementById("showDialogFormDetailed"))))})}var s=this;s.offDialog=i,s.saveFormDialog=l,s.model={isSave:!1,loadPut:!1},a()}t.module("List").component("listDetailed",{bindings:{userObj:"=",callbackFn:"&"},templateUrl:"/js/app/template/list/listDetailed.template.html",controller:e}),e.$inject=["serviceFactory","$mdDialog","$mdToast"]}(window.angular),function(t){"use strict";function e(e,n){function o(){n.show({contentElement:"#showDialogFormOperations",parent:t.element(document.body),clickOutsideToClose:!0})["catch"](function(){l.callbackFn({result:!1})}),function(){var t=new Date;t.setHours(23),t.setMinutes(59),t.setSeconds(59),t.setMilliseconds(999),l.model.datetimeTo=t;var e=new Date;e.setHours(0),e.setMinutes(0),e.setSeconds(0),e.setDate(e.getDate()-7),l.model.datetimeFrom=e}()}function a(){n.cancel()}function i(){l.model.loadPut=!0,e.getTransactionsUser(l.userId,l.model.datetimeFrom,l.model.datetimeTo,l.model.transactionType).then(function(t){l.model.loadPut=!1,l.model.transactions=t.data})["catch"](function(t){})}var l=this;l.offDialog=a,l.getTransactionsUser=i,l.model={transactions:[],datetimeFrom:null,datetimeTo:null,transactionType:null,transactionTypeArr:[{id:null,label:"Не выбран"},{id:"payment",label:"Оплата"},{id:"coupon",label:"Купон"},{id:"inGamePurchase",label:"Покупка в игре"},{id:"internal",label:"Внутренний"},{id:"cancellation",label:"Отмена"}],loadPut:!1},o()}t.module("List").component("listOperations",{bindings:{userId:"=",callbackFn:"&"},templateUrl:"/js/app/template/list/listOperations.template.html",controller:e}),e.$inject=["serviceFactory","$mdDialog"]}(window.angular),function(t){"use strict";function e(e,n,o){function a(){n.show({contentElement:"#showDialogFormBalance",parent:t.element(document.body),clickOutsideToClose:!0})["catch"](function(){s.callbackFn({result:{showBalance:!1,isSave:s.model.isSave}})})}function i(){n.cancel()}function l(){s.model.loadPut=!0,e.setBalanceUser(s.userId,s.model.amount,s.model.comment).then(function(e){s.model.loadPut=!1,200===e.status&&(s.model.isSave=!0,o.show(o.simple().textContent("Пополнение:").position("top start").action("УСПЕШНО").parent(t.element(document.getElementById("showDialogFormBalance")))))})["catch"](function(t){})}var s=this;s.offDialog=i,s.setBalanceUser=l,s.model={amount:0,comment:"любой комент",loadPut:!1,isSave:!1},a()}t.module("List").component("listBalance",{bindings:{userId:"=",callbackFn:"&"},templateUrl:"/js/app/template/list/listBalance.template.html",controller:e}),e.$inject=["serviceFactory","$mdDialog","$mdToast"]}(window.angular),function(t){"use strict";function e(e){function n(){p.getUsers(p.model.offset,p.model.limit)}function o(t,n){e.getUsers(t,n).then(function(t){p.model.user=t.data.data,p.model.totalUser=t.data.recordsTotal,p.model.prBar=!1,d()})["catch"](function(t){})}function a(e){p.model.showDetailedUser=t.copy(e),p.model.showDetailed=!0}function i(t){p.model.showDetailed=t.showDetailed,t.isSave&&p.gotoPage()}function l(t){p.model.showOperationsId=t,p.model.showOperations=!0}function s(t){p.model.showOperations=t}function r(t){p.model.showBalanceId=t,p.model.showBalance=!0}function c(t){p.model.showBalance=t.showBalance,t.isSave&&p.gotoPage()}function u(t){return null===t?"НЕТ ИМЕНИ":t}function m(){p.model.prBar=!0,d(),0!==p.model.totalUser&&p.getUsers(p.model.offset,p.model.limit)}function d(){p.model.totalPage=Math.ceil(p.model.totalUser/p.model.limit),p.model.offset=(p.model.currentPage-1)*p.model.limit}var p=this;p.getUsers=o,p.showDetailsUser=a,p.hideDetailed=i,p.showOperations=l,p.hideOperations=s,p.showBalance=r,p.hideBalance=c,p.getNameUser=u,p.gotoPage=m,p.model={prBar:!0,user:[],totalUser:0,offset:0,limit:10,currentPage:1,totalPage:0,showDetailed:!1,showDetailedUser:null,showOperations:!1,showOperationsId:null,showBalance:!1,showBalancesId:null},n()}t.module("List").component("listUser",{bindings:{},templateUrl:"/js/app/template/list/listUser.template.html",controller:e}),e.$inject=["serviceFactory"]}(window.angular),function(t){"use strict";t.module("Form",["Service"])}(window.angular),function(t){"use strict";function e(t,e){function n(){}function o(){t.addUser(a.model.user_id,a.model.user_name,a.model.user_custom,a.model.email).then(function(t){""===t.data?e.show(e.simple().textContent("Добавление пользователя:").position("top start").action("УСПЕШНО")):e.show(e.simple().textContent("Добавление пользователя: "+t.data.message).position("top start").action("НЕ УДАЧНО"))})["catch"](function(t){})}var a=this;a.submit=o,a.model={user_id:"",user_name:"",user_custom:"",email:""},n()}t.module("Form").component("formContent",{bindings:{},templateUrl:"/js/app/template/form/formContent.template.html",controller:e}),e.$inject=["serviceFactory","$mdToast"]}(window.angular),function(t){"use strict";t.module("Application",["ngMaterial","ngMessages"])}(window.angular),function(t){"use strict";function e(){}t.module("Application").component("headerApplication",{bindings:{},templateUrl:"/js/app/template/application/headerApplication.template.html",controller:e}),e.$inject=[]}(window.angular),function(t){"use strict";function e(){function t(){}function e(t){for(var e in n.tabMenu)t==e?n.tabMenu[e].active=!0:n.tabMenu[e].active=!1}var n=this;n.selectSection=e,t()}t.module("Application").component("menuApplication",{bindings:{tabMenu:"="},templateUrl:"/js/app/template/application/menuApplication.template.html",controller:e}),e.$inject=[]}(window.angular),function(t){"use strict";function e(t){t.theme("default").accentPalette("teal",{"default":"500","hue-1":"100","hue-2":"700","hue-3":"A400"})}function n(){var t=this;t.model={section:{list:{active:!0},form:{active:!1}}}}t.module("App",["ngMaterial","Application","List","Form"]).controller("AppCtrl",n).config(e),e.$inject=["$mdThemingProvider"]}(window.angular);
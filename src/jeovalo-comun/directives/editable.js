'use strict';

var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;
var INT_REGEXP = /^\d+$/;
var FLOAT_REGEXP = /^-?\d*(\.\d+)?$/;
var NOMBRE_REGEXP = /^[a-zA-Z0-9]*[a-zA-Z]+[a-zA-Z0-9]*$/;
var EMAIL_REGEXP = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
var MONEDA_REGEXP = /^\d+(?:\.\d{0,2})$/;
var LETRA_REGEXP = /^[a-zA-Z]+$/;
var DIRECCION_REGEXP = /\d{1,5}\s\w.\s(\b\w*\b\s){1,2}\w*\./;//TODO: Terminar:Ejemplo: 253 N. Cherry St.

/**
 * @ngdoc directive
 * @name jeovaloComun.directive:editable
 * @description
 * # editable
 */
angular.module('jeovaloComun')
  .directive('contenteditable', ['$log', '$sce' , function ($log, $sce) {

   return {//Directiva
     restrict: 'A',
     require: '?ngModel',
     link: function(scope, element, attrs, ngModelCtrl) {
      /*jshint maxcomplexity:10 */ 
      scope.inicial = element.html();
      scope.inicialModelo = ngModelCtrl.$viewValue;

       if(!ngModelCtrl) { return; } // no hace nada si no tiene ng-model

       // Lee un valor HTM, entonces escribe datos al modelo o resetea la vista
       var leer = function () {
         var valor = element.html();
         /*jshint maxcomplexity:9 */         
          /*if ( attrs.stripBr && value == '<br>' ) {
           value = '';
         }*/
         if (attrs.type === 'number' && !NUMBER_REGEXP.test(valor)) {
           ngModelCtrl.$render();
         }
         else if (attrs.type === 'int' && !INT_REGEXP.test(valor)) {
           ngModelCtrl.$render();
         }
         else if (attrs.type === 'float' && !FLOAT_REGEXP.test(valor)) {
           ngModelCtrl.$render();
         }
         else if (attrs.type === 'nombre' && !NOMBRE_REGEXP.test(valor)) {
           ngModelCtrl.$render();
         }
         else if (attrs.type === 'email' && !EMAIL_REGEXP.test(valor)) {
           ngModelCtrl.$render();
         }
         else if (attrs.type === 'moneda' && !MONEDA_REGEXP.test(valor)) {
           ngModelCtrl.$render();
         }
         else if (attrs.type === 'letra' && !LETRA_REGEXP.test(valor)) {
           ngModelCtrl.$render();
         }
         else if (attrs.type === 'direccion' && !DIRECCION_REGEXP.test(valor)) {
           ngModelCtrl.$render();
         } else {
           ngModelCtrl.$setViewValue(valor);
         }
       };

       // Especifica como la interfaz o vista UI debe actualizarse
       ngModelCtrl.$render = function() {
         element.html($sce.getTrustedHtml(ngModelCtrl.$viewValue || ''));
       };

       /* Adiciona un parser personalizado basado en el tipo de entrada del dato (Solamente el formato number esta 
        soportado)
       */
       /* La salida del parser sera aplicado a $modelValue*/
       if (attrs.type === 'number') {
         ngModelCtrl.$parsers.push(function (valor) {
           return Number(valor);
         });
       } else if(attrs.type === 'int') {
         ngModelCtrl.$parsers.push(function (valor) {
           return parseInt(valor);
         });
       } else if(attrs.type === 'float') {
         ngModelCtrl.$parsers.push(function (valor) {
           return parseFloat(valor);
         });
       } else if(attrs.type === 'nombre') {
         ngModelCtrl.$parsers.push(function (valor) {
           return String(valor);
         });
       } else if(attrs.type === 'email') {
         ngModelCtrl.$parsers.push(function (valor) {
           return String(valor);
         });
       } else if(attrs.type === 'moneda') {//TODO: Terminar
         ngModelCtrl.$parsers.push(function (valor) {
           return String(valor);
         });
       } else if(attrs.type === 'letra') {
         ngModelCtrl.$parsers.push(function (valor) {
           return String(valor);
         });
       } else if(attrs.type === 'direccion') {
         ngModelCtrl.$parsers.push(function (valor) {
           return String(valor);
         });
       } else {
        $log.info('Tipo desconocido: ' + attrs.type);
       }

       var cancelarEdicion = function() {
         //ngModelCtrl.$setViewValue(scope.inicial);
         element.html($sce.getTrustedHtml(scope.inicial || ''));
         //element.setAttribute("contenteditable", false);
         element.contenteditable = false;
       };

      var aceptarEdicion = function() {
         ngModelCtrl.render();
         element.contenteditable = false;
      };

       // Escucha los cambios de evento para habilitar el binding
      element.on('blur', function(evento) {
        var keyCode = (window.event) ? evento.keyCode : evento.which;
        if (keyCode === 27) {
          scope.$apply(function () {
            cancelarEdicion();
          });
        } else {
          scope.$apply(leer);
          //scope.$evalAsync(leer);//TODO: Este y (2) remplaza el apply
       }
      });

      element.on('keyup change', function(evento) {
        var keyCode = (window.event) ? evento.keyCode : evento.which;
        if (keyCode === 27) {//Esc
          scope.$apply(function () {
            cancelarEdicion();
          });
        } if(keyCode === 13) {//Enter
          scope.$apply(function () {
            aceptarEdicion();
          });
        } else {
          scope.$apply(leer);
          //scope.$evalAsync(leer);//TODO: Este y (2) remplaza el apply
       }
      });

      element.bind('onkeypress', function(evento) {
        $log.info('Evento ocurrido: onkeypress + ' + evento);
        scope.$apply();
      });
      element.bind('keypress', function(evento) {
        $log.info('Evento ocurrido: keypress + ' + evento);
        scope.$apply();
      });
      //leer(); // (2) inicializa



     /* when the element with the inline attribute is clicked, enable editing
      element.bind('click', function (e) {
        if ((e.target.nodeName.toLowerCase() === 'span') || (e.target.nodeName.toLowerCase() === 'img')) {
          scope.$apply(function () { // bind to scope
            enablingEditing();
          });
        }
      });*/

      /* allow editing to be disabled by pressing the enter key
      element.bind('keypress', function (e) {

        if (e.target.nodeName.toLowerCase() != 'input') return;

        var keyCode = (window.event) ? e.keyCode : e.which;

        if (keyCode === 13) {
          scope.$apply(function () { // bind scope
            disablingEditing();
          });
        }
      });*/

     }



   };
}]);

// install   :      cordova plugin add cordova-plugin-flic
// link      :      https://github.com/jguix/Cordova-Flic

/* globals Connection: true */
angular.module('ngFlic', [])

  .factory('$cordovaFlic', ['$rootScope', '$timeout', function ($rootScope, $timeout) {

    /**
      * Fires flic events
      */
    document.addEventListener('flicButtonPressed', function (event) {
      $timeout(function () {
        $rootScope.$broadcast('$cordovaFlic:flicButtonPressed', event);
      });
    });

    return {
      init: function (appId, appSecret, appName, options) {
        return navigator.Flic.init(appId, appSecret, appName, options);
      },

      getKnownButtons: function(options) {
        return navigator.Flic.getKnownButtons(options);
      },

      grabButton: function (options) {
        return navigator.Flic.grabButton(options);
      },

      waitForButtonEvent: function (options) {
        return navigator.Flic.grabButton(options);
      }
    };
  }])
  .run(['$injector', function ($injector) {
    $injector.get('$cordovaFlic'); //ensure the factory always gets initialised
  }]);
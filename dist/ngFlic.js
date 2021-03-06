// install   :      cordova plugin add cordova-plugin-flic
// link      :      https://github.com/jguix/Cordova-Flic

/* globals Connection: true */
angular.module('ngFlic', [])

  .factory('$cordovaFlic', ['$rootScope', '$timeout', '$q', function ($rootScope, $timeout, $q) {

    /**
      * Fires flic events
      */
    document.addEventListener('flicButtonClick', function (event) {
      $timeout(function () {
        $rootScope.$broadcast('$cordovaFlic:flicButtonClick', event);
      });
    });

    document.addEventListener('flicButtonDblClick', function (event) {
      $timeout(function () {
        $rootScope.$broadcast('$cordovaFlic:flicButtonDblClick', event);
      });
    });

    document.addEventListener('flicButtonHold', function (event) {
      $timeout(function () {
        $rootScope.$broadcast('$cordovaFlic:flicButtonHold', event);
      });
    });

    return {
      init: function (appId, appSecret, appName) {
        // use promises to perform asynchronous Flic function
        return $q(function(resolve, reject) {
          Flic.init(appId, appSecret, appName, {
            success: function(result) {
                resolve(result);
            },
            error: function(message) {
                reject(message);
            }
          });
        });
      },

      getKnownButtons: function() {
        // use promises to perform asynchronous Flic function
        return $q(function(resolve, reject) {
          Flic.getKnownButtons({
            success: function(result) {
                resolve(result);
            },
            error: function(message) {
                reject(message);
            }
          });
        });
      },

      grabButton: function () {
        // use promises to perform asynchronous Flic function
        return $q(function(resolve, reject) {
          Flic.grabButton({
            success: function(result) {
                resolve(result);
            },
            error: function(message) {
                reject(message);
            }
          });
        });
      }

    };
    
  }])

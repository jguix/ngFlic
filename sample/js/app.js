// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngFlic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('MyCtrl', function($scope, $rootScope, $ionicPlatform, $timeout, $cordovaFlic) {

  $ionicPlatform.ready(function() {

    var appId = "dbcce1f9-c4b9-41c1-89fb-2f36c8577706";
    var appSecret = "f17c4448-093b-4ba8-951a-bb40113b1900";
    var appName = "Table Football";

    $scope.status = 'Initiating flic...';
    $scope.buttons = [];

    $scope.grabButton = function() {
      $scope.status = 'Grabbing button...';
      $cordovaFlic.grabButton().then(function(button) {
        $scope.status = 'Grabbed a button.';
        $scope.buttons.push(button);
      }, function(error) {
        $scope.status = 'GrabButton error: ' + error;
      });
    }

    $cordovaFlic.init(appId, appSecret, appName).then(function(result) {
      $scope.status = 'Flic init success.\nGetting known buttons...';

        $cordovaFlic.getKnownButtons().then(function(buttons) {
          $scope.status = 'Got ' + (buttons.length > 0 ? buttons.length : 'no') + ' buttons.';
          buttons.forEach(function(button) {
            $scope.buttons.push(button);
          });
        }, function(error) {
          $scope.status = 'GetKnownButtons error: ' + error;
        });

    }, function(error) {
      $scope.status = 'Flic init error: ' + error;
    });

    $rootScope.$on('$cordovaFlic:flicButtonClick', function (event, data) {
      $scope.status = data.color + ' button received ' + data.type + ' event.';
    });

    $rootScope.$on('$cordovaFlic:flicButtonDblClick', function (event, data) {
      $scope.status = data.color + ' button received ' + data.type + ' event.';
    });

    $rootScope.$on('$cordovaFlic:flicButtonHold', function (event, data) {
      $scope.status = data.color + ' button received ' + data.type + ' event.';
    });

  }, false);

});

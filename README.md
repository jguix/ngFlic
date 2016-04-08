# ngFlic
An AngularJS factory providing access to the Flic SDK

## Installation
Depends on cordova-plugin-flic, a Cordova plugin.

### Cordova app

Add to config.xml

    <preference name="android-minSdkVersion" value="19" />

Then add plugin and install ngFlic through bower

    $ cordova platform add android
    $ cordova plugin add cordova-plugin-flic
    $ bower install ngFlic
    $ cordova build android
    $ cordova run android

### Ionic app

Add to config.xml

    <preference name="android-minSdkVersion" value="19" />

Then add plugin and install ngFlic through bower

    $ ionic platform add android
    $ ionic plugin add cordova-plugin-flic
    $ bower install ngFlic
    $ ionic build android
    $ ionic run android

## Sample usage code

    angular.module('myApp', ['ionic', 'ngFlic'])

    .controller('MyCtrl', function($scope, $ionicPlatform, $timeout, $cordovaFlic) {
      var appId = "MY_FLIC_APP_ID";
      var appSecret = "MY_FLIC_APP_SECRET";
      var appName = "MY_FLIC_APP_NAME";
    
      $scope.status = 'Initiating flic...';
      $scope.buttons = [];

      $ionicPlatform.ready(function() {

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

        $rootScope.$on('$cordovaFlic:flicButtonPressed', function (event, data) {
          $scope.status = data.button.color + ' button received ' + data.event + ' event.';
        });
    
      }, false);

    });

## Sample app

Copy the files from the sample folder to your project's platforms/android/assets/wwww folder.

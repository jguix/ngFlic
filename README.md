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

  $ionicPlatform.ready(function() {

    $cordovaFlic.init(appId, appSecret, appName, {
      success: function(result) {
        $timeout(function () {
          $scope.status = 'Flic init success';
        });
      },
      error: function(message) {
        $scope.status = 'Flic init error: ' + message;
      }
    });

  }, false);

});

## Sample app

Copy the files from the sample folder to your project's platforms/android/assets/wwww folder.

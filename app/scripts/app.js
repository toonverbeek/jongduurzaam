'use strict';
/* global app: true */

var app = angular.module('jongduurzaamApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase'
]).constant('FIREBASE_URL', 'toonverbeek.firebaseio.com')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'PetitionCtrl'
      })
      .when('/admin/', {
        templateUrl: 'views/admin.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

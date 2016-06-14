'use strict';

angular
  .module('movieListApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/movie', {
        templateUrl: 'app/views/movieList.html',
        controller: 'movieListCtrl'
      })
      .when('/movie/:movieId', {
        templateUrl: 'app/views/movieDetail.html',
        controller: 'movieDetailCtrl'
      })
      .when('/about', {
        templateUrl: 'app/views/about.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

'use strict';

angular.module('movieListApp')
  .factory('smoothScroll', function(){
    return function(element){
      $('html, body').animate( {scrollTop: $(element).offset().top}, 1000 );
    };
  })
  .controller('MainCtrl', ['$scope', '$http', 'smoothScroll', function($scope, $http, smoothScroll){

  	$scope.quote = {'content': ['Do, or do not. There is no "try".', 
                                'The only person standing in your way is you.'], 
                    'source': ['Yoda, Star Wars: Episode V - The Empire Strikes Back', 
                               'Thomas Leroy (Vincent Cassel), Black Swan']
    };
    $scope.photos = { 'main': ['jesse', 'neon', 'joy', 'tom2'],
                      'about': ['chris', 'stronger', 'pointing', 'andy']
    };

    $scope.omdbUrl = 'http://www.omdbapi.com/';
    $scope.imdbUrl = 'http://www.imdb.com/';

    $scope.authorInfo = {
      'name': 'Ying-Chun Wang (Sandi Wang)',
      'title': 'Front-End / Web Developer',
      'description': 'Based in NJ, sometimes jaywalking in the New York City.',
      'email': 'snlinot@gmail.com',
      'linkedin': 'https://www.linkedin.com/in/ying-chun-wang-317ba9b0',
      'website': 'http://yingchunwang.co/',
      'tumblr': 'http://sandiwang.tumblr.com/'
    };

  	$http.get('api/top_ten_movie_2015.json')
  		.then(function successCallback(res){
  			$scope.topTenMovies = res.data;
  		}, function errorCallback(res){
  			$scope.errorMsg = res.statusText;
  		});

    $scope.scrollTo = function(element){
      smoothScroll(element);
    }

    $scope.isLoading = function () {
      return $http.pendingRequests.length > 0;
    };

  }])
  .controller('movieDetailCtrl', ['$scope', '$routeParams', '$http', 'smoothScroll', function($scope, $routeParams, $http, smoothScroll){
    $scope.movieId = $routeParams.movieId;

    $http.get('http://www.omdbapi.com/?i='+ $routeParams.movieId +'&plot=full&r=json')
      .then(function successCallback(res){
        $scope.movieDetail = res.data;
      }, function errorCallback(res){
        $scope.errorMsg = res.statusText;
      });

    $scope.scrollTo = function(element){
      smoothScroll(element);
    }

    $scope.isLoading = function () {
          return $http.pendingRequests.length > 0;
    };

  }])
  .controller('movieListCtrl', ['$scope', function($scope){

  }])
  .directive('backButton', ['$window', function($window){
    return {
      restrict: 'A',

      link: function(scope, element, attrs) {
        element.bind('click', function(){
          $window.history.back();
        });
      }
    }
  }]);
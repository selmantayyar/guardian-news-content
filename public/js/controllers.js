'use strict';

/* Controllers */
function IndexCtrl($scope, $http) {
   
}


function SearchPostCtrl($scope, $http, $location, $routeParams,searchResultService) {
  $scope.form = {};
  console.log('scope content: '+$scope.post);

  $scope.searchNews = function () {
    $http.get('/api/searchNews/' +$scope.form.keyword).
      success(function(data) {
         searchResultService.setSearchresult(data);
         $location.url('/readNews');
      });
  };
}

function ReadNewsCtrl($scope, $http, $routeParams,searchResultService) {
       $scope.posts = searchResultService.getSearchResults();
}

function GetNewsCategoryListCtrl($scope, $http) {
    $http.get('/api/categories').
    success(function(data, status, headers, config) {
      $scope.posts = data.posts;
    });
}
function GetNewsByCategoryCtrl($scope, $http, $routeParams) {
  $http.get('/api/news/' + $routeParams.category).
    success(function(data) {
      $scope.posts = data.posts;
    });
}
function GetNewsByIdCtrl($scope, $http, $routeParams) {
  $http.get('/api/newsById/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
    });
}
function GetNewsByDateStatsCtrl($scope, $http) {
    $http.get('/api/newsByDate').
    success(function(data, status, headers, config) {
      $scope.posts = data.posts;
    });
}
function GetNewsByDateListCtrl($scope, $http,$routeParams) {
    $http.get('/api/newsByDate/'+$routeParams.date).
    success(function(data, status, headers, config) {
      $scope.posts = data.posts;
    });
}

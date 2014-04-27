'use strict';

// Declare app level module which depends on filters, and services

var myApp=angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index',
        controller: IndexCtrl
      }).
      when('/readNews', {
        templateUrl: 'partials/readNews',
        controller: ReadNewsCtrl
      }).
      when('/newsCategoryList', {
        templateUrl: 'partials/newsCategoryList',
        controller: GetNewsCategoryListCtrl
      }).  
      when('/newsByCategory/:category', {
        templateUrl: 'partials/newsList',
        controller: GetNewsByCategoryCtrl
      }).
      when('/newsById/:id', {
        templateUrl: 'partials/newsDetailList',
        controller: GetNewsByIdCtrl
      }).     
       when('/newsByDateStats', {
        templateUrl: 'partials/newsDateList',
        controller: GetNewsByDateStatsCtrl
      }). 
      when('/newsByDate/:date', {
        templateUrl: 'partials/newsByDateList',
        controller: GetNewsByDateListCtrl
      }). 
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);

  myApp.service('searchResultService', function() {
  var newsList = [];

  this.setSearchresult = function(data) {
    newsList = [];
     for (var i =0; i<=data.hits.hits.length - 1; i++) {
       newsList.push(data.hits.hits[i]);
     };
  };

  this.getSearchResults = function(){
      return newsList;
  };
});
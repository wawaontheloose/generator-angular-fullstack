'use strict';

angular.module('<%= scriptAppName %>')
  .controller('SignupCtrl', function($scope, Signup<% if (filters.oauth) { %>, $window<% } %>) {
    $scope.user = {};
    $scope.errors = {};
    $scope.register = Signup($scope);<% if (filters.oauth) {%>
    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };<% } %>
  });

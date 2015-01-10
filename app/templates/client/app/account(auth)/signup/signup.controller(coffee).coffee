'use strict'

angular.module '<%= scriptAppName %>'
.controller 'SignupCtrl', ($scope, Signup<% if (filters.oauth) {%>, $window<% } %>) ->
  $scope.user = {}
  $scope.errors = {}
  $scope.register = Signup $scope<% if (filters.oauth) {%>
  $scope.loginOauth = (provider) ->
    $window.location.href = '/auth/' + provider<% } %>

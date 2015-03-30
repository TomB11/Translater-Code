App.controller ('ButtonController', function($scope, $http, Languages) {
    $http.get(Languages.getLanguage())
        .success( function(data) {
            $scope.languages = data
        })
        .error()
});

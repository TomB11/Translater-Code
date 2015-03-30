var App = angular.module('App', ['ngResource', 'ngRoute']);
App.config(['LanguageProvider', 'LanguagesProvider', function (LanguageProvider, LanguagesProvider) {
    LanguageProvider.setServer
    ('http://private-anon-95f2bd1bd-translateservice.apiary-mock.com'),
        LanguagesProvider.setLanguageServer
        ('http://private-anon-5a89c89a6-translateservice.apiary-mock.com/languages')
}]);

App.config(['$routeProvider',function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'scripts/src/Partial/index.html',
            controller: 'IndexController'
        }).
        when('/language/:locale', {
            templateUrl: 'scripts/src/Partial/locale.html',
            controller: 'LanguageController'
        }).
        otherwise({
            redirectTo: '/'
        });
}]);
App.controller ('ButtonController', ['$scope', '$http', 'Languages', function($scope, $http, Languages) {
    $http.get(Languages.getLanguage())
        .success( function(data) {
            $scope.languages = data
        })
        .error()
}]);

App.controller ('IndexController', function(){});
App.controller('LanguageController', ['$scope', 'Language', '$routeParams', function ($scope, Language, $routeParams)
{
    var locale = {};

    var localeName =  $routeParams.locale;

    $scope.locale = $routeParams.locale;

    $scope.model = {
        locale : $routeParams.locale
    };

    Language.urlGet($scope.locale)
        .success(function (data) {
            $scope.locale = data;
        }).error();

    $scope.addWord = function(key, value) {
        $scope.locale[$scope.key] = $scope.value;
        var create = {};
        create[key] = value;

        Language.create(localeName, create);
    };

    $scope.save = function(key, value) {
        locale[key] = value;
        var editTable = {};
        editTable[key] = value;

        Language.edit(localeName, editTable);
    };

    $scope.clear = function () {
        $scope.key = null;
        $scope.value = null;
    };

    $scope.deleteItem = function(key, value) {
        delete $scope.locale[key];
        var del = {};
        del[key] = value;

        Language.deleteWordData(localeName, del);
    };
}]);
App.provider('Language', function() {
    var _server = '';
    var self = this;

    this.setServer = function(server){
        _server = server;
    };

    this.getTranslateUrl = function(locale) {
        return _server + '/translate/' + locale;
    };

    this.$get = ['$http', function($http) {
        return {
            urlGet: function (locale) {
                return $http.get(self.getTranslateUrl(locale));
            },

            create: function (locale, data) {
                return $http.post(self.getTranslateUrl(locale), data);
            },

            edit: function(locale, data) {
                return $http.patch(self.getTranslateUrl(locale), data);
            },

            deleteWordData: function(locale, data) {
                return $http.delete(self.getTranslateUrl(locale), {data:data, headers:{'content-type':'application/json'}});
            }
        }
    }]
});
App.provider('Languages', function() {
    var _server = '';

    this.setLanguageServer = function(server){
        _server = server;
    };

    this.$get = function() {
        return {
            getLanguage: function() {
                return _server;
            }
        }
    }
});

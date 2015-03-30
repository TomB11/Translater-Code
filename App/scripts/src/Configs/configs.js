App.config(function (LanguageProvider, LanguagesProvider) {
    LanguageProvider.setServer
    ('http://private-anon-95f2bd1bd-translateservice.apiary-mock.com'),
        LanguagesProvider.setLanguageServer
        ('http://private-anon-5a89c89a6-translateservice.apiary-mock.com/languages')
});

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
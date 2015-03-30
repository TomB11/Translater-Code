App.controller('LanguageController', function ($scope, Language, $routeParams)
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
});
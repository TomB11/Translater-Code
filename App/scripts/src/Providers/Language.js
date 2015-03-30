App.provider('Language', function() {
    var _server = '';
    var self = this;

    this.setServer = function(server){
        _server = server;
    };

    this.getTranslateUrl = function(locale) {
        return _server + '/translate/' + locale;
    };

    this.$get = function($http) {
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
    }
});
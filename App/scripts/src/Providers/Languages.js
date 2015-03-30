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

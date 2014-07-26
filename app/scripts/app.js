angular.module('myEasyClass', ['ui.bootstrap', 'ngAnimate'])
    .run(['$rootScope', function($rootScope) {
        Parse.initialize(secrets.parse.appId, secrets.parse.appSecret);
    }]);

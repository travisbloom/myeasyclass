angular.module('myEasyClass', ['ui.bootstrap', 'ngAnimate'])
    .run(function() {
        Parse.initialize(secrets.parse.appId, secrets.parse.appSecret);
    });

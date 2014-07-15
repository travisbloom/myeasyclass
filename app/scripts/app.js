angular.module('myEasyClass', ['ui.bootstrap'])
    .run(function() {
        Parse.initialize(secrets.parse.appId, secrets.parse.appSecret);
    });
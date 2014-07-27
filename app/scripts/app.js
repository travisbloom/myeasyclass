angular.module('myEasyClass', ['ui.bootstrap', 'ngAnimate', 'mgcrea.ngStrap.affix', 'mgcrea.ngStrap.helpers.dimensions', 'mgcrea.ngStrap.helpers.debounce'])
    .run([ function() {
        Parse.initialize(secrets.parse.appId, secrets.parse.appSecret);
    }]);

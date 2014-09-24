angular.module('myEasyClass', [
    'ui.bootstrap',
    'ngAnimate',
    'mgcrea.ngStrap.affix',
    'mgcrea.ngStrap.helpers.dimensions',
    'mgcrea.ngStrap.helpers.debounce'
])
    .run([function() {
        Parse.initialize(s.p.i, s.p.s);
    }]);

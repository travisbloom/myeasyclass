angular.module('myEasyClass', [])
    .run(function() {
        Parse.initialize("IUpt7S2ZrTiRfBExlHc1aw8hM7HPNa08Bq8Jv4Rh", "Wg7zFxRTBOqGFtTrJ1jPalvllT61YvsbrrL6mxv4");

    })
    .controller('myCtrl', ['$scope', function ($scope) {
        $scope.test = 'tridgsga';
    }]);
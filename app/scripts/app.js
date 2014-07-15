angular.module('myEasyClass', [])
    .run(function() {
        Parse.initialize(secrets.parse.appId, secrets.parse.appSecret);
    })
    .controller('myCtrl', ['$scope', function ($scope) {
        $scope.test = 'tridgsga';
    }]);
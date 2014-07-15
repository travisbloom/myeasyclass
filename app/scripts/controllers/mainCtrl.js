angular.module('myEasyClass')
    .controller('myCtrl', ['$scope', 'userFactory', function ($scope, userFactory) {
        $scope.test = 'tridgsga';
        if (userFactory.data.loggedIn) {
            $scope.test = 'OMG TRAVIS A USER IS LOGGED IN';
        }
}]);
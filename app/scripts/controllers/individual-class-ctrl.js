angular.module('myEasyClass')
    .controller('individualClassController', ['$scope', 'userFactory', 'classesFactory', function ($scope, userFactory, classesFactory) {
        $scope.test = 'INDIVIDUAL CLASS'
    }]);
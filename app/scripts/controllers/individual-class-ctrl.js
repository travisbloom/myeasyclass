angular.module('myEasyClass')
    .controller('individualClassController', ['$scope', 'userFactory', 'classesFactory', function ($scope, userFactory, classesFactory) {
        console.log($scope.info);
    }]);
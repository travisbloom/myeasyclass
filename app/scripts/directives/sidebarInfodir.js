angular.module('myEasyClass')
.directive('sidebarInfo', [function () {
        return {
            templateUrl: 'templates/sidebarInfo.html',
            restrict: 'A'
        }
    }]);
        angular.module('myEasyClass')
            .directive('sidebarInfo', [function () {
                return {
                    templateUrl: 'templates/sidebar-info.html',
                    restrict: 'A'
                }
            }])
            .directive('searchContainer', [function () {
                return {
                    templateUrl: 'templates/search-container.html',
                    restrict: 'A'
                }
            }])
            .directive('classRow', [function () {
                return {
                    scope: {
                      info: '='
                    },
                    controller: 'individualClassController',
                    templateUrl: 'templates/class.html',
                    restrict: 'A'
                }
            }]);
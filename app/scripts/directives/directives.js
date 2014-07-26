        angular.module('myEasyClass')
            .directive('userDropdown', [function () {
                return {
                    templateUrl: 'templates/user-dropdown.html',
                    scope: true,
                    controller: 'userCtrl',
                    restrict: 'AE'
                }
            }])
            .directive('sidebarInfo', [function () {
                return {
                    templateUrl: 'templates/sidebar-info.html',
                    restrict: 'E'
                }
            }])
            .directive('sidebarSearch', [function () {
                return {
                    templateUrl: 'templates/sidebar-search.html',
                    restrict: 'E'
                }
            }])
            .directive('classRow', [function () {
                return {
                    scope: {
                      info: '='
                    },
                    controller: 'individualClassController',
                    templateUrl: 'templates/class.html',
                    restrict: 'E'
                }
            }]);
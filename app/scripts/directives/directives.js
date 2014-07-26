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
            .directive('searchContainer', [function () {
                return {
                    templateUrl: 'templates/search-container.html',
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
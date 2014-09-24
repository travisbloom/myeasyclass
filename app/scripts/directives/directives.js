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
            templateUrl: 'templates/class.html',
            restrict: 'E'
        }
    }])
    .directive('navbar', [function () {
        return {
            templateUrl: 'templates/navbar.html',
            restrict: 'E'
        }
    }])
    .directive('pulse', [function () {
        return {
            restrict: 'A',
            link: function(scope, el, attr) {
                el.on('mousedown', function() {
                    el.removeClass('pulse');
                });
                el.on('click', function() {
                    el.addClass('pulse');
                })
            }
        }
    }]);
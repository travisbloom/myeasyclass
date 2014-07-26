angular.module('myEasyClass')
    .factory('globalFactory', ['$rootScope', function ($rootScope) {
        var globalData = {
            error: {
                status: false,
                genericError: 'We couldn\'t complete your request. The site failed harder than <a href="http://www.youtube.com/watch?v=Awf45u6zrP0">this cat...</a>'
            },
            /**
            * broadcast any changes to the error message back to the mainController
            * */
            broadcastError: function (msg) {
                globalData.error.status = msg;
                $rootScope.$broadcast('errorUpdate', msg);
            }
        };
        return globalData;
    }]);
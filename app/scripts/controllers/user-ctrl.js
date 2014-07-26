angular.module('myEasyClass')
    .controller('userCtrl', ['$scope', 'userFactory', 'globalFactory', function ($scope, userFactory, globalFactory) {
        //initialize user
        $scope.user = {};
        $scope.signIn = {};
        /**
         * Checks if there is a currentUser on page load, attaches the username to the scope to update navbar dropdown
         * */
        userFactory.currentUser().then(function (username) {
            $scope.user.name = username;
        });

        $scope.signUserIn = function () {
            userFactory.logIn($scope.signIn.username, $scope.signIn.pass).then(function (data) {
            }, function(err){
                if (err.message = "invalid login parameters") {
                    globalFactory.broadcastError('Looks like that username or password doesn\'t exist. If you\'re new here, click the "Sign Up" button to create an account.');
                //catch any other error returned
                } else {
                    $scope.error = globalFactory.error.genericError;
                }
            });
        };
        $scope.logOut = function () {
            userFactory.logOut().then(function (data){
                $scope.user.name = null;
            });
        };
    }]);
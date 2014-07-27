angular.module('myEasyClass')
    .controller('userCtrl', ['$scope', 'userFactory', '$modalInstance', function ($scope, userFactory, $modalInstance) {
        //initialize user
        $scope.user = {};
        $scope.signIn = {};
        $scope.error = false;
        /**
         * Checks if there is a currentUser on page load, attaches the username to the scope to update navbar dropdown
         * */
        userFactory.currentUser().then(function (username) {
            $scope.user.name = username;
        });

        $scope.signUserIn = function () {
            userFactory.logIn($scope.signIn.username, $scope.signIn.pass).then(function (data) {
                $modalInstance.close('Welcome back ' + data.username);
            }, function(err){
                console.log($scope.error);
                if (err.message = "invalid login parameters") {
                    $scope.error = 'Looks like that username or password doesn\'t exist. If you\'re new here, click the "Create An Account" Button';
                //catch any other error returned
                } else {
                    $scope.error = 'We couldn\'t complete your request. The site failed harder than <a href="http://www.youtube.com/watch?v=Awf45u6zrP0">this cat...</a>';
                }
            });
        };
        $scope.signUserUp = function () {
            $scope.error = false;
        };
        $scope.logOut = function () {
            userFactory.logOut().then(function (data){
                $scope.user.name = null;
            });
        };
    }]);
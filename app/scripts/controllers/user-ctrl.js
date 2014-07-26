angular.module('myEasyClass')
    .controller('userCtrl', ['$scope', 'userFactory', function ($scope, userFactory) {
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
            userFactory.logIn($scope.signIn.username, $scope.signIn.pass).then(function (data){
                console.log(data);
                console.log('trasdds');
            }, function(err){
                console.log(err);
            });
        };
        $scope.logOut = function () {
            userFactory.logOut().then(function (data){
                $scope.user.name = null;
            });
        };
    }]);
angular.module('myEasyClass')
    .controller('userCtrl', ['$scope', 'userFactory', '$modalInstance', function ($scope, userFactory, $modalInstance) {
        //initialize user
        $scope.user = {};
        $scope.signIn = {};
        $scope.error = false;

        $scope.signUserIn = function () {
            userFactory.logIn($scope.signIn.username, $scope.signIn.pass).then(function (data) {
                $modalInstance.close('Welcome back ' + data.username);
            }, function(err){
                console.log($scope.error);
                if (err.message = "invalid login parameters") {
                    $scope.error = 'Looks like that username or password doesn\'t exist. If you\'re new here, click the "Create An Account" button';
                //catch any other error returned
                } else {
                    $scope.error = 'We couldn\'t complete your request. The site failed harder than <a href="http://www.youtube.com/watch?v=Awf45u6zrP0">this cat...</a>';
                }
            });
        };

        $scope.signUserUp = function () {
            userFactory.createUser($scope.signIn.username, $scope.signIn.pass).then(function (data) {
                $modalInstance.close('Welcome to MyEasyClass ' + data.username);
            }, function(err) {
                if (err.code = 202) {
                    $scope.error = 'That username already exists, please pick another. If you have already signed up, click the Sign In button';
                    //catch any other error returned
                } else {
                    $scope.error = 'We couldn\'t complete your request. The site failed harder than <a href="http://www.youtube.com/watch?v=Awf45u6zrP0">this cat...</a>';
                }
            });
        }
    }]);
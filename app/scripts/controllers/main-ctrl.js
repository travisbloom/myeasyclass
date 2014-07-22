angular.module('myEasyClass')
    .controller('mainCtrl', ['$scope', 'userFactory', 'classesFactory', '$modal', function ($scope, userFactory, classesFactory, $modal) {
        //initialize user
        $scope.user = {};
        if (userFactory.data.loggedIn) {
            $scope.user.isLoggedIn = true;
            $scope.user.username = true;
        }
        //default state for all collapsed elements
        $scope.collapsed = {
            nav: true,
            search: true
        };
        //default search criteria
        $scope.searchCriteria = {
            contentArea: {
                one: true,
                two: true,
                three: true,
                four: true
            }
        };

        $scope.toggleClassModal = function () {
            $scope.error = 'hello world!'
        };
        $scope.signUserIn = function () {
            userFactory.logIn($scope.user.name, $scope.user.pass).then(function (data){
                console.log(data);
            }, function(err){
                console.log(err);
            });
        };
        $scope.toggleSignUpModal = function () {
            var signUpModal = $modal.open({
                templateUrl: 'templates/sign-up-modal.html',
                controller: 'signUpModalCtrl'
            });
        };

        classesFactory.getClasses().then(function(data){
            $scope.classes = data;
        }, function (err){
            $scope.error = 'There was an error getting the classes. Go grab a beer, watch some Colbert Report, and try again in an hour or so.'
        });
}]);
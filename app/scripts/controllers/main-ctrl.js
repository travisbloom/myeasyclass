angular.module('myEasyClass')
    .controller('mainCtrl', ['$scope', 'classesFactory', 'userFactory', '$modal', function ($scope, classesFactory, userFactory, $modal) {
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
        /**
         * Checks for a current user on page load
        * */
        userFactory.currentUser().then(function(username){
            $scope.user = {
                name: username
            }
        }, function (){
            $scope.user = {}
        });
        $scope.toggleClassModal = function () {
            console.log($scope.error);
//            $scope.error = 'hello world!'
        };
        $scope.toggleSignInModal = function () {
            var signUpModal = $modal.open({
                templateUrl: 'templates/modal-sign-in.html',
                controller: 'userCtrl'
            });
        };

        classesFactory.getClasses().then(function(data){
            $scope.classes = data;
        }, function (err){
            globalFactory.error = 'There was an error getting the classes. Go grab a beer, watch some Colbert Report, and try again in an hour or so.'
        });
}]);
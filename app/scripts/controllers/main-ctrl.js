angular.module('myEasyClass')
    .controller('mainCtrl', ['$scope', 'globalFactory', 'classesFactory', '$modal', function ($scope, globalFactory, classesFactory, $modal) {
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
        * Watches for errorUpdate to be triggered on the rootScope, grabs the new error message in the factory
        * */
        $scope.$on('errorUpdate', function(){
            $scope.error = globalFactory.error.status;
        });
        
        $scope.toggleClassModal = function () {
            console.log($scope.error);
//            $scope.error = 'hello world!'
        };
//        $scope.toggleSignUpModal = function () {
//            var signUpModal = $modal.open({
//                templateUrl: 'templates/sign-up-modal.html',
//                controller: 'signUpModalCtrl'
//            });
//        };

        classesFactory.getClasses().then(function(data){
            $scope.classes = data;
        }, function (err){
            globalFactory.error = 'There was an error getting the classes. Go grab a beer, watch some Colbert Report, and try again in an hour or so.'
        });
}]);
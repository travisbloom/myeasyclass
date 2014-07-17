angular.module('myEasyClass')
    .controller('mainCtrl', ['$scope', 'userFactory', 'classesFactory', function ($scope, userFactory, classesFactory) {
        if (userFactory.data.loggedIn) {
            $scope.user.isLoggedIn = true;
        }
        $scope.navCollapsed = true;
        $scope.searchCriteria = {
            contentArea: {}
        };
        $scope.test = 'testest';
        $scope.toggleClassModal = function () {
            console.log('hi travi!');
            $scope.error = 'hello world!'
        };
        classesFactory.getClasses().then(function(data){
            $scope.classes = data;
        }, function (err){
            $scope.error = 'There was an error getting the classes. Go grab a beer, watch some Colbert Report, and try again in an hour or so.'
        });
}]);
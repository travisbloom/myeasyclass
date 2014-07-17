angular.module('myEasyClass')
    .controller('mainCtrl', ['$scope', 'userFactory', 'classesFactory', function ($scope, userFactory, classesFactory) {
        if (userFactory.data.loggedIn) {
        }
        $scope.navbarCollapsed = true;
        $scope.searchCriteria = {
            contentArea: {}
        };
        classesFactory.getClasses().then(function(data){
            $scope.classes = data;
        }, function (err){
            console.log('AHHH RUN THERE WAS AN ERROR');
        });
}]);
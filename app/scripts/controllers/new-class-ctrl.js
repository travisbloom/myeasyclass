angular.module('myEasyClass')
    .controller('newClassCtrl', ['$scope', '$modalInstance', 'classesFactory', 'relationFactory', function ($scope, $modalInstance, classesFactory, relationFactory) {
        $scope.data = {};
        $scope.createClass = function () {
            classesFactory.createClass($scope.data).then(function (course) {
                var angularClass = course.attributes;
                angularClass.id = course.id;
                console.log(classesFactory.angularClasses);
                classesFactory.angularClasses.push(angularClass);
                $modalInstance.close(angularClass.DepartmentID + ' ' + angularClass.CourseNumber + ' with ' + angularClass.ProfessorName + ' was added to myEasyClass');
            }, function(){
                $scope.error = 'We couldn\'t complete your request. The site failed harder than <a href="http://www.youtube.com/watch?v=Awf45u6zrP0">this cat...</a>';
            });
        };
    }]);
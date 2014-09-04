angular.module('myEasyClass')
    .controller('individualClassController', ['$scope', 'userFactory', 'relationFactory', '$rootScope', function ($scope, userFactory, relationFactory, $rootScope) {
        console.log($scope.info);
        $scope.vote = function (preference, classId) {
            console.log($scope.info);
            if (userFactory.data.username) {
                //add increments the class easiness count and adds a user relation
                relationFactory.vote(preference, classId);
                if (preference === 'liked') {
                    $scope.info.likedByCurrentUser = true;
                    $scope.info.dislikedByCurrentUser = false;
                } else {
                    $scope.info.likedByCurrentUser = true;
                    $scope.info.dislikedByCurrentUser = false;
                }
            } else {
                console.log('errror');
                $rootScope.error = "You need to log in before you can vote on classes!";
                console.log($scope.error)
            }
        }
    }]);
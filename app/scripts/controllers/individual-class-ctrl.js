angular.module('myEasyClass')
    .controller('individualClassController', ['$scope', 'userFactory', 'relationFactory', function ($scope, userFactory, relationFactory) {
        console.log($scope.error);
        $scope.vote = function (preference, classId) {
            console.log('trig');
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
                $scope.error = "You need to log in before you can vote on classes!"
            }
        }
    }]);
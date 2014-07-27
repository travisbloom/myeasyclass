angular.module('myEasyClass')
    .controller('mainCtrl', ['$scope', 'classesFactory', 'relationFactory', 'userFactory', '$modal', '$q', function ($scope, classesFactory, relationFactory, userFactory, $modal, $q) {
        var userStatus, userRelations;

        /**
        * grab relationship data from the userFactory, adds it to $scope.user.relations
         * @param ranked: likes a given class (I wish I named these better)
         * @param dislikes: dislikes a given class
        * */
        userRelations = function () {
            var counter, deferred = $q.defer();
            userFactory.currentUser().then(function () {
                relationFactory.getRelations(['ranked', 'dislikes']).then (function(data) {
                    //adds each relationship type to $scope.user.relations
                    for (counter = 0; counter < data.length; counter++) {
                        $scope.user.relations[data[counter].rel] = data[counter].relatedIds;
                    }
                    console.log($scope.user.relations);
                    deferred.resolve();
                }, function (err) {
                    $scope.error = 'There was an error figuring out what classes you have voted on';
                    deferred.reject();
                });
            });
            return deferred.promise;
        };
        /**
         * Checks for a current user and set the navbar accordingly
        **/
        userStatus = function () {
            userFactory.currentUser().then(function (username) {
                $scope.user.name = username;
            }, function () {
                $scope.user.name = false;
            });
        };

        /**
         * Default scope variables
        * */
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
        $scope.user = {
            relations: {},
            name: false
        };

        /****************
         *ON PAGE LOAD
         ****************/
        userStatus();
        /**
         * pull in classes and map their respective relationships with the user if signed in
         **/
        classesFactory.getClasses().then(function(data) {
            var classCounter, rankedCounter, dislikesCounter, classes;
            $scope.classes = data;
            console.log($scope.classes);
            //grabs the users relations and map them to their respective class
            userRelations().then(function () {
                classes = $scope.classes.classesArray;
                //for each class
                for (classCounter = 0; classCounter < classes.length; classCounter ++){
                    //for each string in the ranked relation
                    for (rankedCounter = 0; rankedCounter < $scope.user.relations.ranked.length; rankedCounter++) {
                        if (classes[classCounter].id === $scope.user.relations.ranked[rankedCounter]) {
                            classes[classCounter].likedByCurrentUser = true;
                        }
                    }
                    //for each string in the dislikes relation
                    for (dislikesCounter = 0; dislikesCounter < $scope.user.relations.dislikes.length; dislikesCounter++) {
                        if (classes[classCounter].id === $scope.user.relations.dislikes[dislikesCounter]) {
                            classes[classCounter].dislikedByCurrentUser = true;
                        }
                    }
                }
            });
        }, function (err){
            $scope.error = 'There was an error getting the classes. Go grab a beer, watch some Colbert Report, and try again in an hour or so.'
        });

        /**
         * Logs the user out
         * */
        $scope.logOut = function () {
            userFactory.logOut().then(function(){
                userStatus();
            });
        };

        $scope.toggleClassModal = function () {
            console.log($scope.error);
            $scope.error = 'hello world!'
        };
        /**
        * Toggle the Sign Up Modal, returns a success string on completion
        * */
        $scope.toggleSignInModal = function () {
            var signUpModal = $modal.open({
                templateUrl: 'templates/modal-sign-in.html',
                controller: 'userCtrl'
            });
            signUpModal.result.then(function (signUpResponse) {
                console.log('new data!');
                console.log(signUpResponse);
                $scope.success = signUpResponse;
            });
        };
}]);
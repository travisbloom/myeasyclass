angular.module('myEasyClass')
    .controller('mainCtrl', ['$scope', 'classesFactory', 'relationFactory', 'userFactory', '$modal', '$q', function ($scope, classesFactory, relationFactory, userFactory, $modal, $q) {
        var userStatus, mapRelations;
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
        $scope.loading = false;
        /**
        * maps user relations to specific class objects
        * */
        mapRelations = function () {
            $scope.loading = true;
            relationFactory.mapClassRelations(['ranked', 'dislikes']).then(function(mappedClasses){
                console.log(mappedClasses);
                $scope.classes = mappedClasses;
                $scope.loading = false;
            }, function () {
                $scope.loading = false;
                $scope.error = 'There was an error getting your class relationship data. Your ratings won\'t show up.'
            });
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

        /****************
         *ON PAGE LOAD
         ****************/
        userStatus();
        /**
         * pull in classes and map their respective relationships with the user if signed in
         **/
        (function () {
            $scope.loading = true;
            classesFactory.getClasses().then(function(classes) {
                $scope.classes = classes;
                //if a user is logged in
                userFactory.currentUser().then(function () {
                    mapRelations();
                }, function () {
                    $scope.loading = false;
                });
            }, function () {
                //mock classes on error, needed for offline dev work
//                $scope.classes = [{CourseNumber: 'test', Easiness: 4}];
                $scope.loading = false;
                $scope.error = 'There was an error getting the classes. Go grab a beer, watch some Colbert Report, and try again in an hour or so.'
            });
        })();

        /**
         * Logs the user out
         * */
        $scope.logOut = function () {
            var counter;
            userFactory.logOut().then(function(){
                userStatus();
                //reset class obj relations
                for (counter = 0; counter < $scope.classes.length; counter++) {
                    $scope.classes[counter].likedByCurrentUser = false;
                    $scope.classes[counter].dislikedByCurrentUser = false;
                }
                $scope.success = 'You\'ve successfully logged out.'
            });
        };
        $scope.toggleClassModal = function () {
            console.log($scope.error);
        };
        /**
        * Toggle the Sign Up Modal, returns a success string on completion
        * */
        $scope.toggleSignInModal = function () {
            var signUpModal = $modal.open({
                templateUrl: 'templates/modal-sign-in.html',
                controller: 'userCtrl'
            });
            //on successful completion
            signUpModal.result.then(function (signUpResponse) {
                $scope.success = signUpResponse;
                $scope.error = false;
                //update the navbar
                userStatus();
                mapRelations();
            });
        };
        /**
        * Let users vote on a given class
        * */
        $scope.vote = function (preference, classIndex) {
            console.log('test');
            var theClass = $scope.classes[classIndex];
            relationFactory.vote(preference, theClass.id, classIndex).then(function (angularClass) {
                console.log(angularClass);
                //update relations/easiness on frontend
                theClass = angularClass;
            }, function (err){
                $scope.error = err;
            });
        }
}]);
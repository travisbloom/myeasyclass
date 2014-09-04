angular.module('myEasyClass')
    .controller('mainCtrl', ['$scope', 'classesFactory', 'relationFactory', 'userFactory', '$modal', '$q', function ($scope, classesFactory, relationFactory, userFactory, $modal, $q) {
        var userStatus, userRelations, loadClasses;
        /**
         * pull in classes and map their respective relationships with the user if signed in
         **/
        (function () {
            classesFactory.getClasses().then(function(classes) {
                $scope.classes = classes;
                //if a user is logged in
                userFactory.currentUser().then(function () {
                    //map the relations to the classes
                    relationFactory.mapClassRelations(['ranked', 'dislikes']).then(function(mappedClasses){
                        console.log(mappedClasses);
                        $scope.classes = mappedClasses;
                    }, function () {
                        $scope.error = 'There was an error getting your class relationship data. Your ratings won\'t show up.'
                    });
                });
            }, function (){
                //mock classes on error, needed for offline dev work
                $scope.classes = [{CourseNumber: 'test', Easiness: 4}];
                $scope.error = 'There was an error getting the classes. Go grab a beer, watch some Colbert Report, and try again in an hour or so.'
            });
        })();
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
         * Logs the user out
         * */
        $scope.logOut = function () {
            userFactory.logOut().then(function(){
                userStatus();
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
                //map the relations to the classes
                relationFactory.mapClassRelations(['ranked', 'dislikes']).then(function(mappedClasses){
                    console.log(mappedClasses);
                    $scope.classes = mappedClasses;
                }, function () {
                    $scope.error = 'There was an error getting your class relationship data. Your ratings won\'t show up.'
                });
            });
        };
        /**
        * Let users vote on a given class
        * */
        $scope.vote = function (preference, classIndex) {
            var theClass = $scope.classes[classIndex];
            relationFactory.vote(preference, theClass.id, classIndex).then(function (angularClass) {
                //update relations/easiness on frontend
                theClass = angularClass;
            }, function (err){
                $scope.error = err;
            });
        }
}]);
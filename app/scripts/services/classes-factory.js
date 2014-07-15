angular.module('myEasyClass')
    .factory('classesFactory', ['$q', function ($q) {
        var classesFactory = {
            data: {
            },
            getClasses: function () {
                var query, counter, jsonResponse = [], newResult, deferred = $q.defer(),
                    course = Parse.Object.extend("Course");
                query = new Parse.Query(course);
                query.limit = 300;
                query.descending('Easiness');
                query.find({
                    success: function(results) {
                        //configures the returned Parse Object from an extended backbone Obj to normal JSON
                        for (counter = 0; counter < results.length; counter ++ ) {
                           newResult = results[counter].attributes;
                           newResult.id = results[counter].id;
                           jsonResponse.push(newResult);
                        }
                        deferred.resolve(jsonResponse);
                    },
                    error: function(err) {
                        deferred.reject();
                        console.log('error');
                    }
                });
                return deferred.promise;
            }
        };
        return classesFactory;
    }]);
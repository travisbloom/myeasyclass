angular.module('myEasyClass')
    .factory('classesFactory', ['$q', 'userFactory', function ($q, userFactory) {
        var classesFactory = {
            //array of classes, cleaned of parse logic for angular manipulation
            angularClasses: null,
            /**
             * adds relation data to classes pulled from the parseClasses function
            * */
            getClasses: function (sortType) {
                var query, counter, classesArray = [], newResult, deferred = $q.defer(), course;
                course = Parse.Object.extend("Course");
                query = new Parse.Query(course);
                query.limit(100);
                if (sortType) {
                    query.equalTo(sortType, true);
                }
                query.descending('Easiness');
                query.find({
                    success: function (results) {
                        //configures the returned Parse Object from an extended backbone Obj to normal JSON
                        for (counter = 0; counter < results.length; counter++) {
                            //add the class to the responseArray
                            newResult = results[counter].attributes;
                            newResult.id = results[counter].id;
                            classesArray.push(newResult);
                        }
                        classesFactory.angularClasses = classesArray;
                        deferred.resolve(classesArray);
                    },
                    error: function () {
                        deferred.reject();
                    }
                });
                return deferred.promise;
            },
            createClass: function (data) {
                var Course = Parse.Object.extend("Course"), deferred = $q.defer();
                Course = new Course();
                //sets the input text to the "name" subclass
                Course.set("DepartmentID", data.departmentId);
                Course.set("CourseNumber", data.courseNumber);
                Course.set("ProfessorName", data.professor);
                Course.set("Easiness", 0);
                Course.set("Area1", data.Area1);
                Course.set("Area2", data.Area2);
                Course.set("Area3", data.Area3);
                Course.set("Area4", data.Area4);
                Course.save(null, {
                    success: function(Course) {
                        console.log(Course);
                        deferred.resolve(Course);
                    },
                    error: function(Course, error) {
                        console.log(error);
                        deferred.reject();
                    }
                });
                return deferred.promise;
            }
        };
        return classesFactory;
    }]);
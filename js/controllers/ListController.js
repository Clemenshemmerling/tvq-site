
app.controller('ListController', ['$scope', '$firebaseArray', function($scope, $firebaseArray){

    var blogs = firebase.database().ref();
    $scope.blogs = $firebaseArray(blogs);

    $scope.removeBlog = function(id) {
        var blog = firebase.database().ref(id);
        blog.remove();
    };

    //angular.element(document).ready(()=> {});
}]);

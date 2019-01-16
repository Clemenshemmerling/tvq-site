app.controller('BlogController', ['$scope','$location', '$routeParams', '$firebaseObject',
    function($scope, $location, $routeParams, $firebaseObject) {
        var ref = firebase.database().ref($routeParams.id);
		$scope.blog = $firebaseObject(ref);
        console.log($scope.blog);
    }
]);
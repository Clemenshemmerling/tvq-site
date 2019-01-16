app.controller('EditController', ['$scope','$location', '$routeParams', '$firebaseObject', 'FBURL',
    function($scope, $location, $routeParams, $firebaseObject, FBURL){

    var ref = firebase.database().ref($routeParams.id);
		$scope.blog = $firebaseObject(ref);
        $scope.editBlog = function() {
            $scope.blog.$save({
                titulo: $scope.blog.titulo,
                descripcion: $scope.blog.descripcion,
                palabra: $scope.blog.palabra,
                fecha: $scope.blog.fecha
            });
            $scope.edit_form.$setPristine();
            $scope.blog = {};
            $location.path('/blogs');
        };
    }
]);

// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read, write: if request.auth != null;
//     }
//   }
// }

app.controller('AddController', ['$scope', '$firebaseArray', '$location', '$firebaseStorage', '$firebaseObject', function($scope, $firebaseArray, $location, $firebaseStorage, $firebaseObject){

	let fileToUpload = null;
	$scope.onChange = function onChange(fileList) {
		fileToUpload = fileList[0];
	};
	$scope.addBlog = function() {
		if (fileToUpload) {
			let storageRef = firebase.storage().ref(fileToUpload.name);
			let storage = $firebaseStorage(storageRef);
			let uploadTask = storage.$put(fileToUpload);
			uploadTask.$complete((snapshot) => {
				var ref = firebase.database().ref();
				var blog = $firebaseArray(ref);
				var pushKey = ref.push().key;
				var formData = $firebaseObject(ref.child(pushKey));
				formData.titulo = $scope.blog.titulo;
				formData.descripcion = $scope.blog.descripcion;
				formData.palabra = $scope.blog.palabra;
				formData.fecha = $scope.blog.fecha;
				formData.name = fileToUpload.name;
				formData.timestamp = firebase.database.ServerValue.TIMESTAMP;
				formData.url = snapshot.downloadURL;
				formData.$save().then(() => {
					angular.element("input[type='file']").val(null);
					fileToUpload = null;
				})
			});
		}
		$location.path('/');
	}

	// $scope.addBlog = function() {
	// 	var rootRef = firebase.database().ref();
	// 	var blog = $firebaseArray(rootRef);
	// 	blog.$add({
	// 		titulo: $scope.blog.titulo,
	// 		descripcion: $scope.blog.descripcion,
	// 		palabra: $scope.blog.palabra,
	// 		fecha: $scope.blog.fecha
	// 	});
	// 	$location.path('/');
	// };
}]);

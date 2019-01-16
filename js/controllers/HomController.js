app.controller('HomController', ['$scope', '$rootScope','$timeout',
    function($scope, $rootScope, $timeout) {
        $rootScope.log = false;
        $scope.signin = function() {
            const name = $scope.name;
            const email = $scope.email;
            const pass = $scope.pass;
            const promise = auth.createUserWithEmailAndPassword(email, pass).then(function (user) {
                $rootScope.userProfile = user.user;
                uid = user.user.uid;
                console.log(uid);
                db.ref('usuarios/' + uid).set({
                    contrasena: $scope.pass,
                    correo: $scope.email,
                    nombre: $scope.name,
                    uid: uid
                }).then(function () {
                    $timeout( function(){
                        $rootScope.log = $rootScope.log = true;
                    }, 500 );
                }).catch(function(error) {
                    console.log(error);
                });
                // var ref = db.ref('usuarios');
                // ref.$save({
                //     contrasena: $scope.pass,
                //     correo: $scope.email,
                //     nombre: $scope.name,
                //     uid: user.uid
                // }, user.uid).then(function() {
                //     $timeout( function(user){
                //         $rootScope.log = $rootScope.log = true;
                //         $rootScope.userProfile = user;
                //         console.log(user);
                //     }, 500); 
                // });
                // console.log('termina');
            });
            promise.catch(e => {
                console.log(e);
                // var mensaje = "";
                // switch (errorCode) {
                //     case "auth/email-already-in-use":
                //         mensaje = "El correo ya existe"
                //         break;
                //     case "auth/invalid-email":
                //         mensaje = "El correo es invalido"
                //         break;
                //     case "auth/operation-not-allowed":
                //         mensaje = "Operación no está permitida"
                //         break;
                //     case "auth/weak-password":
                //         mensaje = "La contraseña es incorrecta"
                //         break;
                //     default:
                //         mensaje = "Al parecer tu conexión no es adecuada"
                //         break;
                // }
                auth.signInWithEmailAndPassword(email, pass)
                    .then(function (user) {
                        console.log('este usuario '+ user.user.uid);
                        if (user) {
                            localStorage.setItem('uid', user.uid);                            
                        }
                    })
                // Materialize.toast(mensaje, 8000)
            });
        }

        $scope.register = function () {
            $scope.regis = true; 
        }

        $scope.ingresar = function () {
            $scope.regis = false; 
        }

        $scope.login = function () {
            let mail = $scope.email;
            let pass = $scope.pass;
            if (mail && pass) {
                auth.signInWithEmailAndPassword(mail, pass)
                .then(function (user) {
                    //Materialize.toast("Se ha iniciado sesión", 8000);
                    $rootScope.userProfile = user;
                    localStorage.setItem('uid', user.uid);
                    $timeout( function(){
                        $rootScope.log = $rootScope.log = true;
                    }, 500 );
                }).catch(function (error) {
                    console.log(error);
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    var mensaje = "";
                    // switch (errorCode) {
                    //     case "auth/invalid-email":
                    //         mensaje = "El correo es incorrecto"
                    //         break;
                    //     case "auth/user-disabled":
                    //         mensaje = "El usuario está bloqueado"
                    //         break;
                    //     case "auth/user-not-found":
                    //         mensaje = "El usuario no existe"
                    //         break;
                    //     case "auth/wrong-password":
                    //         mensaje = "La contraseña es incorrecta"
                    //         break;
                    //     default:
                    //         mensaje = "Al parecer tu conexión no es adecuada"
                    //         break;
                    // }
                    // Materialize.toast(mensaje, 8000);
                });
            }
        }

        $scope.logout = function () {
            auth.signOut().then(function() {
                // Sign-out successful.
                $timeout( function(){
                    $rootScope.log = $rootScope.log = false;
                }, 500 );
            }, function(error) {
                // An error happened.
            });
        }
    }
    
]);
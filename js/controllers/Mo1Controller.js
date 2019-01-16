app.controller("Mo1Controller", function ($scope, $rootScope, $firebaseArray, $firebaseObject, $timeout, $routeParams) {
    Validate();
    $scope.pay = false;
    $scope.validator;
    info = $routeParams.id
    var ref = db.ref('usuarios').child(info);
    $scope.data = $firebaseArray(ref);
    $scope.user = $firebaseObject(ref);
    $scope.user.$loaded()
        .then(function() {
            if($scope.user.aKKPqFUm7hNd9aWA == true) {
                $scope.pay = true;
            }
        })
        .catch(function(err) {
            console.error(err);
            $scope.pay = false;
        });

    function Validate () {
        if(localStorage.getItem('uid') == null ) {
            info = 'none';
            console.log(localStorage.getItem('uid'));
        } else {
            info = localStorage.getItem('uid');
            console.log('si tiene uid')
        }
        
    }  

    $scope.opts = {
        env: 'sandbox',
        client: {
            sandbox:    'ARYPX-tTyzaw-_bvh2WQ4DkGRCvFrF43v_DRhfLG_GjY_S5ufjaxQNvcA5NpquGdpp-M_z2Ti5gYtzDq',
            production: '<insert production client id>'
        },
        payment: function() {
            var env    = this.props.env;
            var client = this.props.client;
            return paypal.rest.payment.create(env, client, {
                transactions: [
                    {
                        amount: { total: '0.99', currency: 'USD' }
                    }
                ]
            });
        },
        commit: true, // Optional: show a 'Pay Now' button in the checkout flow
        onAuthorize: function(data, actions) {
            console.log($rootScope.userProfile)
            // Optional: display a confirmation page here
            return actions.payment.execute().then(function() {
            //     // Show a success page to the buyer
                db.ref('usuarios/' + info).update({
                    aKKPqFUm7hNd9aWA: true,
                });
                $timeout( function(){
                    $scope.pay = $scope.pay = true;
                }, 500 );
            });
        }
    };
    //angular.element(document).ready(()=> {});
});
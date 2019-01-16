var app = angular.module('myApp', ['ngRoute', 'firebase', "paypal-button"]);

app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html'
    })
    .when('/blog', {
      controller: 'ListController',
      templateUrl: 'views/blog.html'
    })
    .when('/detalle/:id', {
      controller: 'BlogController',
      templateUrl: 'views/detalle.html'
    })
    .when('/filosofia', {
      templateUrl: 'views/filosofia.html'
    })
    .when('/contacto', {
      controller: 'ContaController',
      templateUrl: 'views/contacto.html'
    })
    .when('/donde-nace-el-sol/:id', {
      controller: 'Mo1Controller',
      templateUrl: 'views/pelicula1.html'
    })
    .when('/la-bodega/:id', {
      controller: 'Mo2Controller',
      templateUrl: 'views/pelicula2.html'
    })
    .when('/la-casa-de-enfrente/:id', {
      controller: 'Mo3Controller',
      templateUrl: 'views/pelicula3.html'
    })
    .when('/las-cruces/:id', {
      controller: 'Mo4Controller',
      templateUrl: 'views/pelicula4.html'
    })
    .when('/vip-la-otra-casa/:id', {
      controller: 'Mo5Controller',
      templateUrl: 'views/pelicula5.html'
    })
    .when('/tvq-admin', {
      controller: 'ListController',
      templateUrl: 'views/list.html'
    })
    .when('/add', {
      controller: 'AddController',
      templateUrl: 'views/add.html'
    })
    .when('/edit/:id', {
      controller: 'EditController',
      templateUrl: 'views/edit.html'

    })
    .otherwise({
      redirectTo: '/'
    });
});

app.run(function ($rootScope, $location) {
  $rootScope.log = false;
  $rootScope.$on("$routeChangeStart", function (event, next, current) {
      if (!$rootScope.userProfile) {
          auth.onAuthStateChanged(function (user) {
              if (user) {
                  $rootScope.userProfile = user;
                  localStorage.setItem('uid', user.uid);
                  $rootScope.log =  $rootScope.log = true;
              } else {
                  $rootScope.log = $rootScope.log = false;
              }
          });
      }
  });
});

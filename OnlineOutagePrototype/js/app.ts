/// <reference path='_all.ts' />

module map {
    'use strict';

    var map = angular.module('map', ['uiGmapgoogle-maps'])
        .controller('rootController', RootController)
        .controller('introController', IntroController)
        .controller('homeController', HomeController)
        .controller('formController', FormController)
    ;

    angular.module('map', ['ngRoute']).config(['routeProvider', function ($routeProvider:ng.route.IRouteProvider) {
        $routeProvider.when('/map',
            {
                templateUrl: '../views/home.html',
                controller: 'homeController'
            }
            ).
            when('/report',
            {
                templateUrl: '../views/form.html',
                controller: 'formController'
            }
            ).
            otherwise({ redirectTo: '/' });
    }]);
}

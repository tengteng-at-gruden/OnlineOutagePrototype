﻿/// <reference path='_all.ts' />

module map {
    'use strict';

    var map = angular.module('map', ['ngRoute', 'uiGmapgoogle-maps'])
        .controller('rootController', RootController)
        .controller('introController', IntroController)
        .controller('homeController', HomeController)
        .controller('formController', FormController)
        .directive('customradio', CustomRadio)
    ;

    map.config(['$routeProvider', function routes($routeProvider: ng.route.IRouteProvider) {
        $routeProvider.when('/map',
            {
                templateUrl: '../views/home.html',
                controller: 'homeController'
            }
            ).
            when('/report',
            {
                templateUrl: '../views/form.html',
                controller: 'formController',
                controllerAs: "vm"
            }
            ).
            otherwise({ redirectTo: '/' });
    }]);

    map.provider("sharedData", SharedData).config((sharedDataProvider: SharedData) => {
        sharedDataProvider.$get();
    });
}

﻿/// <reference path='_all.ts' />

module map {
    'use strict';

    var map = angular.module('map', ['ngRoute'])
        .controller('rootController', RootController)
        .controller('introController', IntroController)
        .controller('homeController', HomeController)
        .controller('formController', FormController)
        .directive('googleplace', GooglePlace)
        .directive('customradio', CustomRadio.Factory())
        .directive('customselectbox', CustomSelectBox.Factory())
        .directive('icheck', ICheck.Factory())
        .directive('placeholderforall', PlaceholderForAll.Factory())
        .directive('notallowedcharacters', NotAllowedCharacters.Factory())
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

    map.provider("sharedData", SharedData).config(['sharedDataProvider', function shared(sharedDataProvider: SharedData){
        sharedDataProvider.$get();
    }]);
}

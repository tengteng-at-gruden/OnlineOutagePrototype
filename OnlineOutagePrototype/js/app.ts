/// <reference path='_all.ts' />

module map {
    'use strict';

    var map = angular.module('map', ['ngRoute','vcRecaptcha'])
        .controller('rootController', RootController)
        .controller('introController', IntroController)
        .controller('homeController', HomeController)
        .controller('formController', FormController)
        .directive('googleplace', GooglePlace.Factory())
        .directive('customradio', CustomRadio.Factory())
        .directive('customselectbox', CustomSelectBox.Factory())
        .directive('icheck', ICheck.Factory())
        .directive('placeholderforall', PlaceholderForAll.Factory())
        .directive('notallowedcharacters', NotAllowedCharacters.Factory())
        .directive('vcRecaptcha', ['$document', '$timeout', 'vcRecaptchaService', VcRecaptcha.Factory('$document', '$timeout', 'vcRecaptcha')])
        .service('poleData', PoleData)
        .service('mapStorage', MapStorage)
        .service('vcRecaptha', ['$window', '$q', VcRecaptha])
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

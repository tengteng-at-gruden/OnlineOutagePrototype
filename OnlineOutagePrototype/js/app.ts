/// <reference path='_all.ts' />

module map {
    'use strict';

    var map = angular.module('map', ['ngRoute'])
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
        .directive('vcRecaptcha', ['$document', '$timeout', 'recaptcha', VcRecaptcha.Factory()])
        .service('poleData', OutageData)
        .service('mapStorage', MapStorage)
        .service('recaptcha', ['$window', '$q', Recaptcha])
        .service('mapLazyLoad', MapLazyLoad)
    ;

    map.config(['$routeProvider', ($routeProvider: ng.route.IRouteProvider) => {
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

    map.provider("sharedData", SharedData).config(['sharedDataProvider', (sharedDataProvider: SharedData) => {
        sharedDataProvider.$get();
    }]);
}

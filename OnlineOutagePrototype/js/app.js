/// <reference path='../_all.ts' />
var map;
(function (map) {
    'use strict';
    /**
     * Directive that executes an expression when the element it is applied to loses focus.
     */
    function customRadio() {
        return {
            link: function ($scope, element, attributes) {
                element.bind('blur', function () {
                    $scope.$apply(attributes.todoBlur);
                });
                $scope.$on('$destroy', function () {
                    element.unbind('blur');
                });
            }
        };
    }
    map.customRadio = customRadio;
})(map || (map = {}));
/// <reference path='../_all.ts' />
var map;
(function (map) {
    'use strict';
    /**
     * Services that persists and retrieves TODOs from localStorage.
     */
    var SharedData = (function () {
        function SharedData() {
        }
        return SharedData;
    })();
    map.SharedData = SharedData;
})(map || (map = {}));
/// <reference path='../_all.ts' />
/// <reference path='../_all.ts' />
/// <reference path='../_all.ts' />
var map;
(function (map) {
    'use strict';
    /**
     * The main controller for the app. The controller:
     * - retrieves and persists the model via the todoStorage service
     * - exposes the model to the template and provides event handlers
     */
    var RootController = (function () {
        function RootController($scope, $location) {
            this.$scope = $scope;
            this.$location = $location;
            $scope.showIntro = true;
            $scope.showHomeComponent = false;
            $scope.$on('$routeChangeSuccess', function () {
                var path = $location.path();
                if (path == '/') {
                    $scope.showIntro = true;
                    $scope.showHomeComponent = false;
                }
                else if (path == '/map') {
                    $scope.showHomeComponent = true;
                    $scope.showIntro = false;
                }
                else {
                    $scope.showHomeComponent = false;
                    $scope.showIntro = false;
                }
                console.log('URL change success to: ' + path);
            });
        }
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        RootController.$inject = [
            '$scope',
            '$location'
        ];
        return RootController;
    })();
    map.RootController = RootController;
})(map || (map = {}));
/// <reference path='../_all.ts' />
var map;
(function (map) {
    'use strict';
    /**
     * The main controller for the app. The controller:
     * - retrieves and persists the model via the todoStorage service
     * - exposes the model to the template and provides event handlers
     */
    var IntroController = (function () {
        function IntroController($scope, $location) {
            this.$scope = $scope;
            this.$location = $location;
            $scope.introVm = this;
            $scope.location = $location;
        }
        IntroController.prototype.LoadMap = function () {
            this.$location.path('/map');
        };
        IntroController.$inject = [
            '$scope',
            '$location'
        ];
        return IntroController;
    })();
    map.IntroController = IntroController;
})(map || (map = {}));
/// <reference path='../_all.ts' />
var map;
(function (map) {
    'use strict';
    /**
     * The main controller for the app. The controller:
     * - retrieves and persists the model via the todoStorage service
     * - exposes the model to the template and provides event handlers
     */
    var HomeController = (function () {
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function HomeController($scope, $location, $compile) {
            this.$scope = $scope;
            this.$location = $location;
            this.$compile = $compile;
            var mySettings = {
                defaultLati: -33.867487,
                defaultLongi: 151.20699
            };
            $scope.chosenPlace = '';
            $scope.isLoading = false;
            $scope.marker = {};
            $scope.markerAddress = '';
            $scope.markerStatue = '';
            var infoWindowArray = [];
            var infoBoxArray = [];
            var markersArray = [];
            var geocoder = new google.maps.Geocoder();
            //var content = '<div id="infowindow_content" ng-include src="\'/views/infowindow.html\'"></div>';
            var content = '<div id="infowindow_content" ng-include src="\'/views/infobox.html\'"></div>';
            var compiled = $compile(content)($scope);
            $scope.map = { center: { latitude: mySettings.defaultLati, longitude: mySettings.defaultLongi }, zoom: 14 };
            $scope.mapOptions = {
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDoubleClickZoom: true,
                zoomControlOptions: { style: google.maps.ZoomControlStyle.SMALL },
                streetViewControl: false,
                mapTypeControl: false
            };
        }
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        HomeController.$inject = [
            '$scope',
            '$location',
            '$compile'
        ];
        return HomeController;
    })();
    map.HomeController = HomeController;
})(map || (map = {}));
/// <reference path='../_all.ts' />
var map;
(function (map) {
    'use strict';
    /**
     * The main controller for the app. The controller:
     * - retrieves and persists the model via the todoStorage service
     * - exposes the model to the template and provides event handlers
     */
    var FormController = (function () {
        function FormController() {
        }
        return FormController;
    })();
    map.FormController = FormController;
})(map || (map = {}));
/// <reference path='_all.ts' />
var map;
(function (_map) {
    'use strict';
    var map = angular.module('map', ['ngRoute', 'uiGmapgoogle-maps']).controller('rootController', _map.RootController).controller('introController', _map.IntroController).controller('homeController', _map.HomeController).controller('formController', _map.FormController);
    map.config(['$routeProvider', function routes($routeProvider) {
        $routeProvider.when('/map', {
            templateUrl: '../views/home.html',
            controller: 'homeController'
        }).when('/report', {
            templateUrl: '../views/form.html',
            controller: 'formController'
        }).otherwise({ redirectTo: '/' });
    }]);
})(map || (map = {}));
//# sourceMappingURL=app.js.map
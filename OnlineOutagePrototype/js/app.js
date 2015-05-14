var map;
(function (map) {
    'use strict';
    /**
     * Directive that executes an expression when the element it is applied to loses focus.
     */
    function GooglePlace() {
        return {
            link: function (scope, element, attributes) {
                var options = {
                    types: ['geocode'],
                    componentRestrictions: { country: 'au' }
                };
                var gPlace = new google.maps.places.Autocomplete(element[0]);
                var geocoder = new google.maps.Geocoder();
                google.maps.event.addListener(gPlace, 'place_changed', function () {
                    var place = gPlace.getPlace();
                    if (!place.geometry) {
                        return;
                    }
                    if (place.geometry.viewport) {
                        scope.map.fitBounds(place.geometry.viewport);
                        scope.map.setZoom(18);
                    }
                    else {
                        scope.map.setCenter(place.geometry.location);
                        scope.map.setZoom(18);
                    }
                });
            }
        };
    }
    map.GooglePlace = GooglePlace;
})(map || (map = {}));
/// <reference path='../_all.ts' />
var map;
(function (map) {
    'use strict';
    /**
     * Services that persists and retrieves TODOs from localStorage.
     */
    var SharedData = (function () {
        function SharedData(currentLocation, currentViewport, currentMarker, currentAddress) {
            this.currentLocation = {};
            this.currentViewport = {};
            this.currentMarker = {};
            this.currentAddress = {};
            this.currentLocation = currentLocation;
            this.currentViewport = currentViewport;
            this.currentMarker = currentMarker;
            this.currentAddress = currentAddress;
        }
        SharedData.prototype.setCurrentLocation = function (value) {
            this.currentLocation = value;
            this.currentViewport = {};
        };
        SharedData.prototype.setCurrentViewport = function (value) {
            this.currentViewport = value;
            this.currentLocation = {};
        };
        SharedData.prototype.getLocationOrViewport = function () {
            if (!$.isEmptyObject(this.currentViewport)) {
                return { type: 'viewport', value: this.currentViewport };
            }
            else if (!$.isEmptyObject(this.currentLocation)) {
                return { type: 'location', value: this.currentLocation };
            }
            else {
                return { type: 'none', value: {} };
            }
        };
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
    var HomeController = (function () {
        function HomeController($scope, $location, $compile) {
            this.$scope = $scope;
            this.$location = $location;
            this.$compile = $compile;
            var mySettings = {
                defaultLati: -33.867487,
                defaultLongi: 151.20699,
                NSW_NE_lat: -27.664069,
                NSW_NE_lng: 154.35791,
                NSW_SW_lat: -44.197959,
                NSW_SW_lng: 137.175293,
            };
            $scope.chosenPlace = '';
            $scope.isLoading = false;
            $scope.homeVm = this;
            $scope.marker = {};
            $scope.markerAddress = '';
            $scope.markerStatue = '';
            var infoWindowArray = [];
            var infoBoxArray = [];
            var markersArray = [];
            this.geocoder = new google.maps.Geocoder();
            //var content = '<div id="infowindow_content" ng-include src="\'/views/infowindow.html\'"></div>';
            var content = '<div id="infowindow_content" ng-include src="\'/views/infobox.html\'"></div>';
            var compiled = $compile(content)($scope);
            var mapOptions = {
                center: new google.maps.LatLng(mySettings.defaultLati, mySettings.defaultLongi),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDoubleClickZoom: true,
                zoomControlOptions: { style: google.maps.ZoomControlStyle.SMALL },
                streetViewControl: false,
                mapTypeControl: false,
                bounds: new google.maps.LatLngBounds(new google.maps.LatLng(mySettings.NSW_SW_lat, mySettings.NSW_SW_lng), new google.maps.LatLng(mySettings.NSW_NE_lat, mySettings.NSW_NE_lng))
            };
            $scope.map = new google.maps.Map(document.getElementById('myMap'), mapOptions);
            $scope.map.setZoom(14);
        }
        HomeController.prototype.searchAddress = function () {
            //alert("search");
            //this.$scope.chosenPlace = $('#addressSearchBox').val();
            //var geocodeRequest = {
            //    'address': this.$scope.chosenPlace,
            //    'bounds': new google.maps.LatLngBounds(
            //        new google.maps.LatLng(-27.664069, 154.35791),
            //        new google.maps.LatLng(-44.197959, 137.175293)),
            //    'location': this.$scope.map.getCenter(),
            //    'region': 'aus'
            //};
            //this.geocoder.geocode(
            //    geocodeRequest,
            //    function (results, status) {
            //        if (status == google.maps.GeocoderStatus.OK) {
            //            var loc = results[0].geometry.location;        
            //            this.$scope.map.setCenter(loc);
            //            this.$scope.map.setZoom(18);
            //            this.$scope.showMarkers();
            //            this.$scope.showClickMessage = true;
            //        } else {
            //            this.$scope.mainForm.addressSearchBox.$setValidity('nsw', true);
            //            this.$scope.showLoading = false;
            //            this.$scope.showNoAddressResult = true;
            //            this.$scope.$apply();
            //        }
            //    });
        };
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
    var map = angular.module('map', ['ngRoute']).controller('rootController', _map.RootController).controller('introController', _map.IntroController).controller('homeController', _map.HomeController).controller('formController', _map.FormController).directive('googleplace', _map.GooglePlace);
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
//# sourceMappingURL=app.js.map
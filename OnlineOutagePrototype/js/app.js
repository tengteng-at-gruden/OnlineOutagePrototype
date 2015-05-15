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
        function HomeController($scope, $location, $compile, $http) {
            this.$scope = $scope;
            this.$location = $location;
            this.$compile = $compile;
            this.$http = $http;
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
            this.infoWindowArray = [];
            this.infoBoxArray = [];
            this.markersArray = [];
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
            var $scope = this.$scope;
            var $this = this;
            var geocodeRequest = {
                'address': $scope.chosenPlace,
                'bounds': new google.maps.LatLngBounds(new google.maps.LatLng(-27.664069, 154.35791), new google.maps.LatLng(-44.197959, 137.175293)),
                'location': $scope.map.getCenter(),
                'region': 'aus'
            };
            //this.geocoder.geocode(
            //    geocodeRequest,
            //    function (results, status) {
            //        if (status == google.maps.GeocoderStatus.OK) {
            //            var loc = results[0].geometry.location;        
            //            $scope.map.setCenter(loc);
            //        } else {
            //            alert("No result Found");
            //        }
            //    });
            $scope.map.setZoom(18);
            $this.showMarkers();
        };
        HomeController.prototype.showMarkers = function () {
            var $this = this;
            var poleData = new map.PoleData(this.$http);
            var zoom = this.$scope.map.getZoom();
            if (zoom > 17) {
                var bounds = this.$scope.map.getBounds();
                var ne = bounds.getNorthEast();
                var sw = bounds.getSouthWest();
                var viewbox = {
                    "bottomleft": { "lat": sw.lat(), "lng": sw.lng() },
                    "topright": { "lat": ne.lat(), "lng": ne.lng() }
                };
                // retrieve poles from Ausgrid service
                poleData.getPoles({ box: viewbox }).then(function (result) {
                    if (result.d) {
                        $this.setMarkers(result.d);
                        $this.$scope.isLoading = false;
                    }
                }, function (error) {
                });
            }
            else {
                $this.resetMarkers();
                $this.resetInfoBoxes();
            }
        };
        HomeController.prototype.setMarkers = function (assets) {
            var $this = this;
            var imageURL = '/images/Status_Sprites.png';
            var workingImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(1, 1));
            var reportedImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(23, 1));
            var heldImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(45, 1));
            var nonausgridImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(67, 1));
            var workingHoverImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(1, 23));
            var reportedHoverImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(23, 23));
            var heldHoverImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(45, 23));
            var nonausgridHoverImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(67, 23));
            var count = 0;
            for (var index in assets) {
                if (assets[index].lat) {
                    var location = new google.maps.LatLng(assets[index].lat, assets[index].lng);
                    var image = workingImage;
                    var hoverImage = workingHoverImage;
                    if (assets[index].Status == 'reported') {
                        image = reportedImage;
                        hoverImage = reportedHoverImage;
                    }
                    else if (assets[index].Status == 'held') {
                        image = heldImage;
                        hoverImage = heldHoverImage;
                    }
                    else if (assets[index].Status == 'nonausgrid') {
                        image = nonausgridImage;
                        hoverImage = nonausgridHoverImage;
                    }
                    var marker = new google.maps.Marker({
                        position: location,
                        map: $this.$scope.map,
                        icon: image,
                        title: assets[index].AssetNo,
                        customStatus: assets[index].Status,
                        webID: assets[index].WebID,
                    });
                    this.markersArray.push(marker);
                    this.attachInfoBox(marker);
                }
            }
        };
        HomeController.prototype.attachInfoBox = function (marker) {
            var $this = this;
            var myOptions = {
                disableAutoPan: false,
                pixelOffset: new google.maps.Size(-140, 0),
                zIndex: null,
                closeBoxMargin: "10px 2px 2px 2px",
                closeBoxURL: "/images/close.png",
                infoBoxClearance: new google.maps.Size(1, 1),
                isHidden: false,
                pane: "floatPane",
                enableEventPropagation: false
            };
            var ib = new google.maps.InfoWindow(myOptions);
            this.infoBoxArray.push(ib);
            //add click handler
            google.maps.event.addListener(marker, 'click', function () {
                $this.clickMarker(marker, ib);
            });
        };
        HomeController.prototype.clickMarker = function (marker, infobox) {
            this.geocoder.geocode({ 'latLng': marker.getPosition() }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        // hacking: sometime ng-include is not working for second time
                        if (!this.compiled[0].nextSibling) {
                            this.compiled = this.$compile(this.content)(this.$scope);
                        }
                        this.$scope.marker = marker;
                        this.$scope.markerAddress = results[0].formatted_address;
                        this.$scope.$apply();
                        infobox.setContent(this.compiled[0].nextSibling.innerHTML);
                        //resetInfoBoxes();
                        infobox.open(this.$scope.myMap, marker);
                        //close button hover state change
                        google.maps.event.addListener(infobox, 'domready', function () {
                            //Have to put this within the domready or else it can't find the div element (it's null until the InfoBox is opened)
                            $(infobox.div_).find('img[src="/images/close.png"]').hover(function () {
                                //This is called when the mouse enters the element
                                $(this).attr('src', '/images/close-hover.png');
                            }, function () {
                                //This is called when the mouse leaves the element
                                $(this).attr('src', '/images/close.png');
                            });
                        });
                    }
                }
            });
        };
        //clear all current markers
        HomeController.prototype.resetMarkers = function () {
            if (this.markersArray.length) {
                for (var i = 0; i < this.markersArray.length; i++) {
                    this.markersArray[i].setMap(null);
                }
                this.markersArray.length = 0;
            }
        };
        HomeController.prototype.resetInfoBoxes = function () {
            if (this.infoBoxArray.length) {
                for (var i = 0; i < this.infoBoxArray.length; i++) {
                    this.infoBoxArray[i].close();
                }
            }
        };
        HomeController.prototype.reportAsset = function () {
            this.$location.path('/report');
        };
        HomeController.$inject = [
            '$scope',
            '$location',
            '$compile',
            '$http'
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
/// <reference path='../_all.ts' />
var map;
(function (map) {
    'use strict';
    /**
     * Services that persists and retrieves TODOs from localStorage.
     */
    var PoleData = (function () {
        function PoleData($http) {
            this.$http = $http;
            this.baseUrl = '/data/';
        }
        PoleData.prototype.getPoles = function (container) {
            var promise = this.$http.get(this.baseUrl + 'poles.json', container).then(function (response) {
                console.log(response);
                return response.data;
            });
            return promise;
        };
        PoleData.$inject = [
            '$http'
        ];
        return PoleData;
    })();
    map.PoleData = PoleData;
})(map || (map = {}));
//# sourceMappingURL=app.js.map
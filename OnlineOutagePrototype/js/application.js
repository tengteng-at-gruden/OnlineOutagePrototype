var map;
(function (map) {
    'use strict';
    var CustomRadio = (function () {
        function CustomRadio() {
            this.restrict = 'A';
            this.require = 'ngModel';
            this.link = function (scope, element, attrs, model) {
                var value = attrs['value'];
                var noValue = $(element).data('not-selected');
                $(element).radiobutton({
                    className: 'switch-off',
                    checkedClass: 'switch-on'
                }).on('change', function (event) {
                    if ($(element).attr('type') === 'radio' && attrs['ngModel']) {
                        return scope.$apply(function () {
                            if ($(element).attr('checked')) {
                                return model.$setViewValue(value);
                            }
                            else {
                                return model.$setViewValue(noValue);
                            }
                        });
                    }
                });
            };
        }
        CustomRadio.Factory = function () {
            var directive = function () {
                return new CustomRadio();
            };
            return directive;
        };
        return CustomRadio;
    })();
    map.CustomRadio = CustomRadio;
})(map || (map = {}));
var map;
(function (map) {
    'use strict';
    var CustomSelectBox = (function () {
        function CustomSelectBox() {
            this.restrict = 'A';
            this.require = 'ngModel';
            this.link = function (scope, element, attrs, model) {
                $(element).selectbox({});
            };
        }
        CustomSelectBox.Factory = function () {
            var directive = function () {
                return new CustomSelectBox();
            };
            return directive;
        };
        return CustomSelectBox;
    })();
    map.CustomSelectBox = CustomSelectBox;
})(map || (map = {}));
var map;
(function (map) {
    'use strict';
    /**
     * Directive that executes an expression when the element it is applied to loses focus.
     */
    var GooglePlace = (function () {
        function GooglePlace() {
            this.restrict = 'A';
            this.require = 'ngModel';
            this.link = function (scope, element, attrs, model) {
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
                    }
                    else {
                        scope.map.setCenter(place.geometry.location);
                    }
                });
            };
        }
        GooglePlace.Factory = function () {
            var directive = function () {
                return new GooglePlace();
            };
            return directive;
        };
        return GooglePlace;
    })();
    map.GooglePlace = GooglePlace;
})(map || (map = {}));
var map;
(function (map) {
    'use strict';
    var ICheck = (function () {
        function ICheck() {
            this.restrict = 'A';
            this.require = 'ngModel';
            this.link = function (scope, element, attrs, model) {
                var value;
                value = attrs['value'];
                scope.$watch(attrs['ngModel'], function (newValue) {
                    $(element).iCheck('update');
                });
                return $(element).iCheck({
                    checkboxClass: 'icheckbox_minimal-grey',
                    radioClass: 'iradio_minimal-grey',
                    hoverClass: 'none'
                }).on('ifChanged', function (event) {
                    if ($(element).attr('type') === 'checkbox' && attrs['ngModel']) {
                        scope.$apply(function () { return model.$setViewValue(event.target.checked); });
                    }
                    if ($(element).attr('type') === 'radio' && attrs['ngModel']) {
                        return scope.$apply(function () { return model.$setViewValue(value); });
                    }
                });
            };
        }
        ICheck.Factory = function () {
            var directive = function () {
                return new ICheck();
            };
            return directive;
        };
        return ICheck;
    })();
    map.ICheck = ICheck;
})(map || (map = {}));
var map;
(function (map) {
    'use strict';
    var PlaceholderForAll = (function () {
        function PlaceholderForAll() {
            this.restrict = 'A';
            this.require = 'ngModel';
            this.link = function (scope, element, attrs, model) {
                var value;
                var placehold = function () {
                    element.val(attrs.placeholder);
                    element.addClass('placeholder');
                };
                var unplacehold = function () {
                    element.val('');
                    element.removeClass('placeholder');
                };
                // detect modern browsers
                var dummy = document.createElement('input');
                if (dummy.placeholder != undefined) {
                    return;
                }
                scope.$watch(attrs.ngModel, function (val) {
                    value = val || '';
                });
                element.bind('focus', function () {
                    if (value == '')
                        unplacehold();
                });
                element.bind('blur', function () {
                    if (element.val() == '')
                        placehold();
                });
                model.$formatters.unshift(function (val) {
                    if (!val) {
                        placehold();
                        value = '';
                        return attrs.placeholder;
                    }
                    return val;
                });
            };
        }
        PlaceholderForAll.Factory = function () {
            var directive = function () {
                return new PlaceholderForAll();
            };
            return directive;
        };
        return PlaceholderForAll;
    })();
    map.PlaceholderForAll = PlaceholderForAll;
})(map || (map = {}));
var map;
(function (map) {
    'use strict';
    var NotAllowedCharacters = (function () {
        function NotAllowedCharacters() {
            this.restrict = 'A';
            this.require = 'ngModel';
            this.link = function (scope, element, attrs, model) {
                var notAllowedCharacters = ["<", ">", "{", "}", "(", ")", "[", "]", "'", "\""];
                function validate() {
                    var newValue = model.$viewValue;
                    for (var i = 0; i < notAllowedCharacters.length; i++) {
                        if (newValue.indexOf(notAllowedCharacters[i]) === -1) {
                            model.$setValidity('notAllowedCharacters', true);
                            $(element).siblings('.not-allowed-message').remove();
                        }
                        else {
                            model.$setValidity('notAllowedCharacters', false);
                            if ($(element).siblings('.not-allowed-message').length == 0) {
                                $(element).after("<span class='not-allowed-message'>The text fields should not allow braces or quotes &lt;&gt;(){}[]&quot'</span>");
                            }
                            break;
                        }
                    }
                }
                scope.$watch(function () { return model.$viewValue; }, validate);
            };
        }
        NotAllowedCharacters.Factory = function () {
            var directive = function () {
                return new NotAllowedCharacters();
            };
            return directive;
        };
        return NotAllowedCharacters;
    })();
    map.NotAllowedCharacters = NotAllowedCharacters;
})(map || (map = {}));
/// <reference path="../_all.ts" /> 
/// <reference path='../_all.ts' />
/// <reference path='../_all.ts' />
/// <reference path='../_all.ts' />
/// <reference path='../_all.ts' />
/// <reference path='../_all.ts' />
var map;
(function (map) {
    'use strict';
    var OutageData = (function () {
        function OutageData($http) {
            this.$http = $http;
            this.baseUrl = '/data/';
        }
        OutageData.prototype.getOutages = function (container, timeStatus) {
            var status = timeStatus == "future" ? '2' : '';
            var promise = this.$http
                .get(this.baseUrl + 'poles' + status + '.json', container)
                .then(function (response) {
                return response.data;
            });
            return promise;
        };
        OutageData.$inject = [
            '$http'
        ];
        return OutageData;
    })();
    map.OutageData = OutageData;
})(map || (map = {}));
/// <reference path='../_all.ts' />
var map;
(function (map) {
    'use strict';
    var SharedData = (function () {
        function SharedData() {
            this.currentLocation = {};
            this.currentAddress = '';
            this.currentMarker = {};
            this.currentViewport = {};
        }
        SharedData.prototype.$get = function () {
            return this;
        };
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
var map;
(function (map) {
    'use strict';
    var MapStorage = (function () {
        function MapStorage(outageData) {
            this.outageData = outageData;
            this.infoBoxArray = [];
            this.markersArray = [];
        }
        MapStorage.prototype.initializeMap = function ($scope, $compile) {
            $("#outageInfo").hide();
            var mySettings = {
                defaultLati: -33.867487,
                defaultLongi: 151.20699,
                NSW_NE_lat: -27.664069,
                NSW_NE_lng: 154.35791,
                NSW_SW_lat: -44.197959,
                NSW_SW_lng: 137.175293,
            };
            $scope.chosenPlace = '';
            $scope.radOutageTime = 'now';
            $scope.isLoading = false;
            $scope.marker = {};
            $scope.markerAddress = '';
            $scope.markerStatue = '';
            this.geocoder = new google.maps.Geocoder();
            this.content = '<div id="infowindow_content" ng-include src="\'/views/infobox.html\'"></div>';
            this.compiled = $compile(this.content)($scope);
            var opts = {
                center: new google.maps.LatLng(mySettings.defaultLati, mySettings.defaultLongi),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDoubleClickZoom: true,
                zoomControlOptions: { style: google.maps.ZoomControlStyle.SMALL },
                streetViewControl: false,
                mapTypeControl: false,
                bounds: new google.maps.LatLngBounds(new google.maps.LatLng(mySettings.NSW_SW_lat, mySettings.NSW_SW_lng), new google.maps.LatLng(mySettings.NSW_NE_lat, mySettings.NSW_NE_lng))
            };
            $scope.map = new google.maps.Map(document.getElementById('myMap'), opts);
            $scope.map.setZoom(14);
        };
        MapStorage.prototype.showMarkers = function ($scope, timeStatus) {
            var thisScope = this;
            var zoom = $scope.map.getZoom();
            if (zoom > 17) {
                var bounds = $scope.map.getBounds();
                var ne = bounds.getNorthEast();
                var sw = bounds.getSouthWest();
                var viewbox = {
                    "bottomleft": { "lat": sw.lat(), "lng": sw.lng() },
                    "topright": { "lat": ne.lat(), "lng": ne.lng() }
                };
                // retrieve poles from Ausgrid service
                this.outageData.getOutages({ box: viewbox }, timeStatus).then(function (result) {
                    if (result.d) {
                        thisScope.setMarkers(result.d, $scope);
                        $scope.isLoading = false;
                    }
                }, function (error) {
                });
            }
            else {
                this.resetMarkers();
            }
        };
        MapStorage.prototype.setMarkers = function (assets, $scope) {
            var imageURL = '/images/Status_Sprites.png';
            var workingImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(1, 1));
            var reportedImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(23, 1));
            var heldImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(45, 1));
            var nonausgridImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(67, 1));
            var workingHoverImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(1, 23));
            var reportedHoverImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(23, 23));
            var heldHoverImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(45, 23));
            var nonausgridHoverImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(67, 23));
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
                        map: $scope.map,
                        icon: image,
                        title: assets[index].AssetNo,
                        customStatus: assets[index].Status,
                        webID: assets[index].WebID,
                    });
                    this.markersArray.push(marker);
                    this.attachInfoBox(marker, $scope);
                }
            }
        };
        MapStorage.prototype.attachInfoBox = function (marker, $scope) {
            var thisScope = this;
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
                thisScope.clickMarker(marker, $scope);
            });
        };
        MapStorage.prototype.clickMarker = function (marker, $scope) {
            $("#outageInfo").animate({ width: 'toggle' }, 800);
            this.offsetCenter(marker.getPosition(), -278 / 2, 0, $scope);
        };
        MapStorage.prototype.offsetCenter = function (latlng, offsetx, offsety, $scope) {
            var scale = Math.pow(2, $scope.map.getZoom());
            var nw = new google.maps.LatLng($scope.map.getBounds().getNorthEast().lat(), $scope.map.getBounds().getSouthWest().lng());
            var worldCoordinateCenter = $scope.map.getProjection().fromLatLngToPoint(latlng);
            var pixelOffset = new google.maps.Point((offsetx / scale) || 0, (offsety / scale) || 0);
            var worldCoordinateNewCenter = new google.maps.Point(worldCoordinateCenter.x - pixelOffset.x, worldCoordinateCenter.y + pixelOffset.y);
            var newCenter = $scope.map.getProjection().fromPointToLatLng(worldCoordinateNewCenter);
            $scope.map.setCenter(newCenter);
        };
        //clear all current markers
        MapStorage.prototype.resetMarkers = function () {
            if (this.markersArray.length) {
                for (var i = 0; i < this.markersArray.length; i++) {
                    this.markersArray[i].setMap(null);
                }
                this.markersArray.length = 0;
            }
        };
        MapStorage.$inject = [
            'poleData'
        ];
        return MapStorage;
    })();
    map.MapStorage = MapStorage;
})(map || (map = {}));
/// <reference path='../_all.ts' />
var map;
(function (map) {
    'use strict';
    var MapLazyLoad = (function () {
        function MapLazyLoad($q, $window) {
            this.$q = $q;
            this.$window = $window;
        }
        MapLazyLoad.prototype.asynGoogleMap = function () {
            var asyncUrl = 'http://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&libraries=places&callback=', mapsDefer = this.$q.defer();
            this.$window['googleMapsInitialized'] = function () {
                mapsDefer.resolve; // removed ()
                //alert("load success");
            };
            this.asyncLoad(asyncUrl, 'googleMapsInitialized');
            return mapsDefer.promise;
        };
        MapLazyLoad.prototype.asyncLoad = function (asyncUrl, callbackName) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = asyncUrl + callbackName;
            document.body.appendChild(script);
        };
        MapLazyLoad.$inject = [
            '$q',
            '$window'
        ];
        return MapLazyLoad;
    })();
    map.MapLazyLoad = MapLazyLoad;
})(map || (map = {}));
/// <reference path='../_all.ts' />
var map;
(function (map) {
    'use strict';
    var RootController = (function () {
        function RootController($scope, $location) {
            this.$scope = $scope;
            this.$location = $location;
            $scope.showIntro = true;
            $scope.showHomeComponent = false;
            $scope.$on('$routeChangeSuccess', function () {
                var path = $location.path();
                if (path === '/') {
                    $scope.showIntro = true;
                    $scope.showHomeComponent = false;
                }
                else if (path === '/map') {
                    $scope.showHomeComponent = true;
                    $scope.showIntro = false;
                }
                else {
                    $scope.showHomeComponent = false;
                    $scope.showIntro = false;
                }
                console.log('URL change success to: ' + path);
            });
            if (navigator.geolocation) {
                console.log('browser supports geo location');
                navigator.geolocation.getCurrentPosition(function (position) {
                    console.log('use geo location, lati:' + position.coords.latitude);
                    console.log('use geo location, longi:' + position.coords.longitude);
                    $scope.defaultLati = position.coords.latitude;
                    $scope.defaultLongi = position.coords.longitude;
                }, function () {
                    console.log('wait for 0.5 sec for retrieving geo location but failed');
                }, { timeout: 500 });
            }
            else {
                window.console.log('browser does not support geo location');
            }
        }
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
    var IntroController = (function () {
        function IntroController($scope, $location) {
            this.$scope = $scope;
            this.$location = $location;
            $scope.introVm = this;
        }
        IntroController.prototype.loadMap = function () {
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
        function HomeController($scope, $location, $compile, $http, mapStorage, mapLazyLoad) {
            this.$scope = $scope;
            this.$location = $location;
            this.$compile = $compile;
            this.$http = $http;
            this.mapStorage = mapStorage;
            this.mapLazyLoad = mapLazyLoad;
            $scope.homeVm = this;
            //this.mapLazyLoad.asynGoogleMap().then(function () {
            this.mapStorage.initializeMap($scope, $compile);
            //});
            $scope.$watch('radOutageTime', function (newVal, oldVal) {
                $scope.homeVm.showMarkers();
            });
        }
        HomeController.prototype.searchAddress = function () {
            this.$scope.map.setZoom(18);
            this.showMarkers();
        };
        HomeController.prototype.showMarkers = function () {
            this.mapStorage.resetMarkers();
            this.mapStorage.showMarkers(this.$scope, this.$scope.radOutageTime);
        };
        HomeController.prototype.closeWindow = function () {
            $("#outageInfo").animate({ width: 'toggle' }, 800);
        };
        HomeController.prototype.reportAsset = function () {
            this.$location.path('/report');
        };
        HomeController.$inject = [
            '$scope',
            '$location',
            '$compile',
            '$http',
            'mapStorage',
            'mapLazyLoad'
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
        function FormController($scope, $location, $anchorScroll, $rootScope, sharedData) {
            this.$scope = $scope;
            this.$location = $location;
            this.$anchorScroll = $anchorScroll;
            this.$rootScope = $rootScope;
            this.sharedData = sharedData;
            this.marker = this.sharedData.currentMarker;
            this.markerAddress = this.sharedData.currentAddress;
            this.chosenPlace = '';
            this.chosenEquipment = '';
            this.chkValue = false;
            this.radValue = 'radio1';
            this.refInfo = '';
            this.email = '';
            this.mRadValue = true;
            this.acceptValue = false;
            $scope.formVm = this;
        }
        FormController.prototype.submitForm = function () {
            console.log(this.$scope.testform.$valid);
            var old = this.$location.hash();
            this.$location.hash('emailField');
            this.$anchorScroll();
            //reset to old to keep any additional routing logic from kicking in
            this.$location.hash(old);
        };
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        FormController.$inject = [
            '$scope',
            '$location',
            '$anchorScroll',
            '$rootScope',
            'sharedData'
        ];
        return FormController;
    })();
    map.FormController = FormController;
})(map || (map = {}));
/// <reference path='_all.ts' />
var map;
(function (map_1) {
    'use strict';
    var map = angular.module('map', ['ngRoute'])
        .controller('rootController', map_1.RootController)
        .controller('introController', map_1.IntroController)
        .controller('homeController', map_1.HomeController)
        .controller('formController', map_1.FormController)
        .directive('googleplace', map_1.GooglePlace.Factory())
        .directive('customradio', map_1.CustomRadio.Factory())
        .directive('customselectbox', map_1.CustomSelectBox.Factory())
        .directive('icheck', map_1.ICheck.Factory())
        .directive('placeholderforall', map_1.PlaceholderForAll.Factory())
        .directive('notallowedcharacters', map_1.NotAllowedCharacters.Factory())
        .service('poleData', map_1.OutageData)
        .service('mapStorage', map_1.MapStorage)
        .service('mapLazyLoad', map_1.MapLazyLoad);
    map.config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/map', {
                templateUrl: '../views/home.html',
                controller: 'homeController'
            }).
                when('/report', {
                templateUrl: '../views/form.html',
                controller: 'formController',
                controllerAs: "vm"
            }).
                otherwise({ redirectTo: '/' });
        }]);
    map.provider("sharedData", map_1.SharedData).config(['sharedDataProvider', function (sharedDataProvider) {
            sharedDataProvider.$get();
        }]);
})(map || (map = {}));
/// <reference path='../scripts/typings/jquery/jquery.d.ts' />
/// <reference path='../scripts/typings/jquery/jquery.selectbox.d.ts' />
/// <reference path='../scripts/typings/jquery/jquery.radiobutton.d.ts' />
/// <reference path='../scripts/typings/icheck/icheck.d.ts' />
/// <reference path='../scripts/typings/angularjs/angular.d.ts' />
/// <reference path='../scripts/typings/angularjs/angular-route.d.ts' />
/// <reference path='../scripts/typings/google.maps.d.ts' />
/// <reference path='directives/custom-radio.ts' />
/// <reference path='directives/custom-selectbox.ts' />
/// <reference path='directives/google-place.ts' />
/// <reference path='directives/icheck.ts' />
/// <reference path='directives/placeholder-for-all.ts' />
/// <reference path='directives/validate-not-allowed-characters.ts' />
/// <reference path='interfaces/IHomeScope.ts' />
/// <reference path='interfaces/IRootScope.ts' />
/// <reference path='interfaces/IIntroScope.ts' />
/// <reference path='interfaces/IOutageData.ts' />
/// <reference path='interfaces/ISharedData.ts' />
/// <reference path='interfaces/IMapStorage.ts' />
/// <reference path='interfaces/IMapLazyLoad.ts' />
/// <reference path='services/OutageData.ts' />
/// <reference path='services/sharedData.ts' />
/// <reference path='services/MapStorage.ts' />
/// <reference path='services/MapLazyLoad.ts' />
/// <reference path='controllers/RootController.ts' />
/// <reference path='controllers/IntroController.ts' />
/// <reference path='controllers/HomeController.ts' />
/// <reference path='controllers/FormController.ts' />
/// <reference path='app.ts' /> 
/// <reference path='../_all.ts' />
//# sourceMappingURL=application.js.map
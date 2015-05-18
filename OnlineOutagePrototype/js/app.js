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
    function CustomSelectBox() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, model) {
                $(element).selectbox();
            }
        };
    }
    map.CustomSelectBox = CustomSelectBox;
})(map || (map = {}));
var map;
(function (map) {
    'use strict';
    function ICheck() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, model) {
                var value;
                value = attrs['value'];
                scope.$watch(attrs['ngModel'], function (newValue) {
                    $(element).iCheck('update');
                });
                return $(element).iCheck({
                    checkboxClass: 'icheckbox_minimal-grey',
                    radioClass: 'iradio_minimal-grey',
                    hoverClass: 'none',
                }).on('ifChanged', function (event) {
                    if ($(element).attr('type') === 'checkbox' && attrs['ngModel']) {
                        scope.$apply(function () {
                            return model.$setViewValue(event.target.checked);
                        });
                    }
                    if ($(element).attr('type') === 'radio' && attrs['ngModel']) {
                        return scope.$apply(function () {
                            return model.$setViewValue(value);
                        });
                    }
                });
            }
        };
    }
    map.ICheck = ICheck;
})(map || (map = {}));
var map;
(function (map) {
    'use strict';
    function PlaceholderForAll() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, model) {
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
            }
        };
    }
    map.PlaceholderForAll = PlaceholderForAll;
})(map || (map = {}));
var map;
(function (map) {
    'use strict';
    function NotAllowedCharacters() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, model) {
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
                scope.$watch(function () {
                    return model.$viewValue;
                }, validate);
            }
        };
    }
    map.NotAllowedCharacters = NotAllowedCharacters;
})(map || (map = {}));
/// <reference path='../_all.ts' />
/// <reference path='../_all.ts' />
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
(function (_map) {
    'use strict';
    var map = angular.module('map', ['ngRoute', 'uiGmapgoogle-maps']).controller('rootController', _map.RootController).controller('introController', _map.IntroController).controller('homeController', _map.HomeController).controller('formController', _map.FormController).directive('customradio', _map.CustomRadio.Factory()).directive('customselectbox', _map.CustomSelectBox).directive('icheck', _map.ICheck).directive('placeholderforall', _map.PlaceholderForAll).directive('notallowedcharacters', _map.NotAllowedCharacters);
    map.config(['$routeProvider', function routes($routeProvider) {
        $routeProvider.when('/map', {
            templateUrl: '../views/home.html',
            controller: 'homeController'
        }).when('/report', {
            templateUrl: '../views/form.html',
            controller: 'formController',
            controllerAs: "vm"
        }).otherwise({ redirectTo: '/' });
    }]);
    map.provider("sharedData", _map.SharedData).config(function (sharedDataProvider) {
        sharedDataProvider.$get();
    });
})(map || (map = {}));
/// <reference path='../_all.ts' />
//# sourceMappingURL=app.js.map
/// <reference path='../_all.ts' />

module map {
    'use strict';

    /**
     * The main controller for the app. The controller:
     * - retrieves and persists the model via the todoStorage service
     * - exposes the model to the template and provides event handlers
     */
    export class HomeController {

        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        public static $inject = [
            '$scope',
            '$location',
            '$compile'
        ];

        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        constructor(
            private $scope,
            private $location: ng.ILocationService,
            private $compile
            ) {
            var mySettings = {
                defaultLati: -33.867487,
                defaultLongi: 151.20699
            };
            $scope.chosenPlace = '';
            $scope.chosenPoleNumber = '';
            $scope.isLoading = false;
            $scope.poles = {};

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
				zoomControlOptions: {  style: google.maps.ZoomControlStyle.SMALL }, 
				streetViewControl: false, 
				mapTypeControl: false
			};
            
        }

    

    }

}

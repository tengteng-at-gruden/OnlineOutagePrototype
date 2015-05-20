/// <reference path='../_all.ts' />

module map {
    'use strict';

    export class HomeController {

        private geocoder: google.maps.Geocoder;
        private content: string;
        private compiled: any;

        public static $inject = [
            '$scope',
            '$location',
            '$compile',
            '$http',
            'poleData',
            'mapStorage'
        ];

        constructor(
            private $scope: IHomeScope,
            private $location: ng.ILocationService,
            private $compile: ng.ICompileService,
            private $http: ng.IHttpService,
            private poleData: IPoleData,
            private mapStorage: IMapStorage
            ) {
            $("#outageInfo").hide();
            var mySettings = {
                defaultLati: -33.867487,
                defaultLongi: 151.20699,
                NSW_NE_lat : -27.664069,
                NSW_NE_lng : 154.35791,
                NSW_SW_lat : -44.197959,
                NSW_SW_lng : 137.175293,
            };
            
            $scope.chosenPlace = '';
            $scope.isLoading = false;
            $scope.homeVm = this;
            $scope.marker = {};
            $scope.markerAddress = '';
            $scope.markerStatue = '';

            this.geocoder = new google.maps.Geocoder();

            this.content = '<div id="infowindow_content" ng-include src="\'/views/infobox.html\'"></div>';
            this.compiled = $compile(this.content)($scope); 

            var opts: google.maps.MapOptions = {
                center: new google.maps.LatLng(mySettings.defaultLati, mySettings.defaultLongi),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDoubleClickZoom: true,
                zoomControlOptions: { style: google.maps.ZoomControlStyle.SMALL },
                streetViewControl: false,
                mapTypeControl: false,
                bounds: new google.maps.LatLngBounds(
                    new google.maps.LatLng(mySettings.NSW_SW_lat, mySettings.NSW_SW_lng),
                    new google.maps.LatLng(mySettings.NSW_NE_lat, mySettings.NSW_NE_lng))
            };

            $scope.map = new google.maps.Map(document.getElementById('myMap'), opts);

            $scope.map.setZoom(14);
        }

        searchAddress() {
            this.$scope.map.setZoom(18);
            this.showMarkers();
        }

        showMarkers() {
            this.mapStorage.showMarkers(this.$scope);
        }

        closeWindow() {
            $("#outageInfo").slideToggle("slow");
        }
        reportAsset() {
            this.$location.path('/report');
        }
    }

}

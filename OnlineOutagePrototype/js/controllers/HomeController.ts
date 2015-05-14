/// <reference path='../_all.ts' />

module map {
    'use strict';

    export class HomeController {

        private geocoder;

        public static $inject = [
            '$scope',
            '$location',
            '$compile'
        ];

        constructor(
            private $scope: IHomeScope,
            private $location: ng.ILocationService,
            private $compile
            ) {
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
                bounds: new google.maps.LatLngBounds(
                    new google.maps.LatLng(mySettings.NSW_SW_lat, mySettings.NSW_SW_lng),
                    new google.maps.LatLng(mySettings.NSW_NE_lat, mySettings.NSW_NE_lng))
            };

            $scope.map = new google.maps.Map(document.getElementById('myMap'), mapOptions);

            $scope.map.setZoom(14);
        
        }

       searchAddress() {
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

        }

    }

}

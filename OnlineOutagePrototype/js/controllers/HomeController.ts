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
            'mapStorage'
        ];

        constructor(
            private $scope: IHomeScope,
            private $location: ng.ILocationService,
            private $compile: ng.ICompileService,
            private $http: ng.IHttpService,
            private mapStorage: IMapStorage
            ) {
             
            $scope.homeVm = this;

            this.mapStorage.initializeMap($scope, $compile);
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

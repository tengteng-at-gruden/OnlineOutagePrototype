/// <reference path='../_all.ts' />

module map {
    'use strict';

    export class HomeController {

        public static $inject = [
            '$scope',
            '$location',
            '$compile',
            '$http',
            'mapStorage',
            'mapLazyLoad'
        ];

        constructor(
            private $scope: IHomeScope,
            private $location: ng.ILocationService,
            private $compile: ng.ICompileService,
            private $http: ng.IHttpService,
            private mapStorage: IMapStorage,
            private mapLazyLoad: IMapLazyLoad
            ) {
             
            $scope.homeVm = this;

            //this.mapLazyLoad.asynGoogleMap().then(function () {
                this.mapStorage.initializeMap($scope, $compile);
            //});

            $scope.$watch('radOutageTime', function (newVal, oldVal) {
                $scope.homeVm.showMarkers();
                });
        }

        searchAddress() {
            this.$scope.map.setZoom(18);
            this.showMarkers();
        }

        showMarkers() {
            this.mapStorage.resetMarkers();
            this.mapStorage.showMarkers(this.$scope, this.$scope.radOutageTime);
        }

        closeWindow() {
            $("#outageInfo").toggle('slide', { direction: 'right' });   
        }
        reportAsset() {
            this.$location.path('/report');
        }
    }

}

/// <reference path='../_all.ts' />

module map {
    'use strict';

    export class RootController {
        public static $inject = [
            '$scope',
            '$location'
        ];

        constructor(
            private $scope: IRootScope,
            private $location: ng.ILocationService
            ) {

            $scope.showIntro = true;

            $scope.showHomeComponent = false;

            $scope.$on('$routeChangeSuccess', () => {
                var path = $location.path();

                if (path === '/') {
                    $scope.showIntro = true;
                    $scope.showHomeComponent = false;
                } else if (path === '/map') {
                    $scope.showHomeComponent = true;
                    $scope.showIntro = false;
                } else {
                    $scope.showHomeComponent = false;
                    $scope.showIntro = false;
                }

                console.log('URL change success to: ' + path);
            });

            if (navigator.geolocation) {
                console.log('browser supports geo location');
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        console.log('use geo location, lati:' + position.coords.latitude);
                        console.log('use geo location, longi:' + position.coords.longitude);

                        $scope.defaultLati = position.coords.latitude;
                        $scope.defaultLongi = position.coords.longitude;
                    },
                    () => {
                        console.log('wait for 0.5 sec for retrieving geo location but failed');
                    },
                    { timeout: 500 }
                    );
            } else {
                window.console.log('browser does not support geo location');
            }
        }

    }

}

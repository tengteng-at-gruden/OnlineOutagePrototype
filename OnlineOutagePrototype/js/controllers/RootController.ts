﻿/// <reference path='../_all.ts' />

module map {
    'use strict';

    /**
     * The main controller for the app. The controller:
     * - retrieves and persists the model via the todoStorage service
     * - exposes the model to the template and provides event handlers
     */
    export class RootController {

        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
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
        }

    }

}

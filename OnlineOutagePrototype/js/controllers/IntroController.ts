/// <reference path='../_all.ts' />

module map {
    'use strict';

    /**
     * The main controller for the app. The controller:
     * - retrieves and persists the model via the todoStorage service
     * - exposes the model to the template and provides event handlers
     */
    export class IntroController {
        public static $inject = [
            '$scope',
            '$location'
        ];

        constructor(
            private $scope: IMapScope,
            private $location: ng.ILocationService
            ) {
            $scope.introVm = this;
            $scope.location = $location;
        }
        LoadMap() {
            this.$location.path('/map');
        }
    }

}

/// <reference path='../_all.ts' />

module map {
    'use strict';

    export class IntroController {
        public static $inject = [
            '$scope',
            '$location'
        ];

        constructor(
            private $scope: IIntroScope,
            private $location: ng.ILocationService
            ) {
            $scope.introVm = this;
        }

        loadMap() {
            this.$location.path('/map');
        }
    }

}

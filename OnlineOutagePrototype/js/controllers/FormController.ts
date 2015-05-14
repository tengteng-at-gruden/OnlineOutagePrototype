/// <reference path='../_all.ts' />

module map {
    'use strict';

    /**
     * The main controller for the app. The controller:
     * - retrieves and persists the model via the todoStorage service
     * - exposes the model to the template and provides event handlers
     */
    export class FormController {

        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        public static $inject = [
            '$scope',
            '$location',
            '$anchorScroll',
            '$rootScope'
        ];

        constructor(
            private $scope: IMapScope,
            private $location: ng.ILocationService,
            private $anchorScroll: ng.IAnchorScrollService,
            private $rootScope: ng.IRootScopeService
            ) {
            $scope.formVm = this;
        }

        chosenPlace: string = '';
        chosenEquipment: string = '';
        chkValue: boolean = false;
        radValue: string = 'radio1';
        refInfo: string = '';
        email: string = '';
        mRadValue: boolean = true;

        submitForm() {
            console.log(this.$scope.testform.$valid);

            var old = this.$location.hash();
            this.$location.hash('emailField');
            this.$anchorScroll();
            //reset to old to keep any additional routing logic from kicking in
            this.$location.hash(old);
        }
    }

}

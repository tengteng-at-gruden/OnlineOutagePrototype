/// <reference path='../_all.ts' />

module map {
    'use strict';

    export class FormController {

        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        public static $inject = [
            '$scope',
            '$location',
            '$anchorScroll',
            '$rootScope',
            'sharedData',
            'recaptcha'
        ];

        constructor(
            private $scope: IRootScope,
            private $location: ng.ILocationService,
            private $anchorScroll: ng.IAnchorScrollService,
            private $rootScope: ng.IRootScopeService,
            private sharedData: ISharedData,
            private recaptcha: IRecaptcha
            ) {
            $scope.formVm = this;
            $scope.response = null;
            $scope.widgetId = null;
            $scope.model = {
                //Recaptha key for domain: localhost
                key: '6LcMLAcTAAAAAEtKsIfH9lfykpVkeO8gKby76JT1'
            };
        }

        marker = this.sharedData.currentMarker;
        markerAddress: string = this.sharedData.currentAddress;
        chosenPlace: string = '';
        chosenEquipment: string = '';
        chkValue: boolean = false;
        radValue: string = 'radio1';
        refInfo: string = '';
        email: string = '';
        mRadValue: boolean = true;
        acceptValue: boolean = false;
        captchaValue: boolean = false;

        setResponse (response) {
            console.info('Captcha verified: ' + response);
            this.$scope.response = response;
            this.captchaValue = true;
        }

        setWidgetId (widgetId) {
            this.$scope.widgetId = widgetId;
        }

        submitForm() {
            console.log("Form validation: " + this.$scope.testform.$valid);

            var old = this.$location.hash();
            this.$location.hash('emailField');
            this.$anchorScroll();
            //reset to old to keep any additional routing logic from kicking in
            this.$location.hash(old);
        }
    }

}

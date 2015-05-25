/// <reference path='../_all.ts' />

module map {
	export interface IRootScope extends ng.IScope {
        showIntro: boolean;
        showHomeComponent: boolean;
        location: ng.ILocationService;
        formVm: FormController;
        testform: ng.IFormController;

        defaultLati: number;
        defaultLongi: number;

        marker: {};
        markers: {};
        markerAddress: string;
        markerStatue: string;

        response;
        widgetId;
        model;
	}
}
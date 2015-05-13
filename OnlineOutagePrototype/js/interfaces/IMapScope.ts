/// <reference path='../_all.ts' />

module map {
	export interface IMapScope extends ng.IScope {
        showIntro: boolean;
        showHomeComponent: boolean;
		location: ng.ILocationService;
        introVm: IntroController;
        formVm: FormController;
	}
}
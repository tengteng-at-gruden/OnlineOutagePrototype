/// <reference path='../_all.ts' />

module map {
	export interface IMapScope extends ng.IScope {
        newTodo: string;
        showIntro: boolean;
        showHomeComponent: boolean;
        location: ng.ILocationService;
        introVm: IntroController;
	}
}
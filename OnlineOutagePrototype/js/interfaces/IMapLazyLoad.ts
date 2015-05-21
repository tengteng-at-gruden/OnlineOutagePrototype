/// <reference path='../_all.ts' />
module map {

    export interface IMapLazyLoad {
        asynGoogleMap(): ng.IPromise<{}>;
    }
}
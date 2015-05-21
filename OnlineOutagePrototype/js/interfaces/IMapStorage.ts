/// <reference path='../_all.ts' />
module map {

    export interface IMapStorage {
        initializeMap($scope: any, $compile: any): void;
        showMarkers($scope: any): void;
    }
}
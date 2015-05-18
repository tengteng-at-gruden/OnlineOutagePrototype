/// <reference path='../_all.ts' />

module map {
    export interface ISharedData {

        currentLocation: {};
        currentViewport: {};
        currentMarker: {};
        currentAddress: string;

        getLocationOrViewport(): {};
        setCurrentViewport(value);
        setCurrentLocation(value);
    }
}
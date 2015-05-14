/// <reference path='../_all.ts' />

module map {
    'use strict';

    /**
     * Services that persists and retrieves TODOs from localStorage.
     */
    export class SharedData {

        private currentLocation = {};
        private currentViewport = {};
        private currentMarker = {};
        private currentAddress = {};

        constructor(currentLocation: any, currentViewport: any, currentMarker: any, currentAddress: any) {
            this.currentLocation = currentLocation;
            this.currentViewport = currentViewport;
            this.currentMarker = currentMarker;
            this.currentAddress = currentAddress;
        }
        setCurrentLocation(value: any) {
            this.currentLocation = value;
            this.currentViewport = {};
        }
        setCurrentViewport(value: any) {
            this.currentViewport = value;
            this.currentLocation = {};
        }
        getLocationOrViewport() {
            if (!$.isEmptyObject(this.currentViewport)) {
                return { type: 'viewport', value: this.currentViewport };
            } else if (!$.isEmptyObject(this.currentLocation)) {
                return { type: 'location', value: this.currentLocation };
            } else {
                return { type: 'none', value: {} };
            }
        }
    }
}
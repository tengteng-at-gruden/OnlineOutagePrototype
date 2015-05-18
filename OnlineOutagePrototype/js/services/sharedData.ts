/// <reference path='../_all.ts' />

module map {
    'use strict';

    export class SharedData implements ISharedData {

        currentLocation = {};
        currentAddress = '';
        currentMarker = {};
        currentViewport = {};

        public $get(): ISharedData {
            return this;
        }

        setCurrentLocation(value) {
            this.currentLocation = value;
            this.currentViewport = {};
        }
        setCurrentViewport(value) {
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
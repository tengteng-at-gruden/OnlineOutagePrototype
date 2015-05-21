/// <reference path='../_all.ts' />

module map {
    'use strict';

    export class MapLazyLoad {

        private baseUrl;

        public static $inject = [
            '$q',
            '$window'
        ];
        constructor(
            private $q: ng.IQService,
            private $window: ng.IWindowService
            ) {
        }
        
        asynGoogleMap(): ng.IPromise<{}> {

            var asyncUrl = 'http://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&libraries=places&callback=',
                mapsDefer = this.$q.defer();

            this.$window['googleMapsInitialized'] = function () {
                mapsDefer.resolve; // removed ()
                //alert("load success");
            }

            this.asyncLoad(asyncUrl, 'googleMapsInitialized');

            return mapsDefer.promise;
            
        }

        asyncLoad(asyncUrl: string, callbackName: string) {

            var script = document.createElement('script');

            script.type = 'text/javascript';

            script.src = asyncUrl + callbackName;

            document.body.appendChild(script);
        }
    }
}
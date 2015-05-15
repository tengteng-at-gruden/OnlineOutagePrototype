/// <reference path='../_all.ts' />

module map {
    'use strict';

    /**
     * Services that persists and retrieves TODOs from localStorage.
     */
    export class PoleData {

        private baseUrl;

        public static $inject = [
            '$http'
        ];
        constructor(
            private $http: ng.IHttpService
            ) {
            this.baseUrl = '/data/';
        }
        getPoles(container: any) {
            var promise = this.$http
                .get(this.baseUrl + 'poles.json', container)
                .then(function (response) {
                    console.log(response);
                    return response.data;
                }
                );
            return promise;
        }
    }
}
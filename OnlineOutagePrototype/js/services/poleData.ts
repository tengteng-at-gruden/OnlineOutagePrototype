/// <reference path='../_all.ts' />

module map {
    'use strict';

    export class PoleData implements IPoleData {

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
                    return response.data;
                }
                );
            return promise;
        }
    }
}
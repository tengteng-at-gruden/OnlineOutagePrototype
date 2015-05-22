/// <reference path='../_all.ts' />

module map {
    'use strict';

    export class OutageData implements IOutageData {

        private baseUrl;

        public static $inject = [
            '$http'
        ];
        constructor(
            private $http: ng.IHttpService
            ) {
            this.baseUrl = '/data/';
        }
        getOutages(container: any, timeStatus) {
            var status = timeStatus == "future" ? '2' : '';
            var promise = this.$http
                .get(this.baseUrl + 'poles' + status + '.json', container)
                .then(function (response) {
                    return response.data;
                }
                );
            return promise;
        }
    }
}
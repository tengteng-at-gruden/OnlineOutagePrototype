/// <reference path='../_all.ts' />

module map {
    'use strict';

    export class Recaptcha implements IRecaptcha {

        private deferred;
        private promise;
        private recaptcha;

        public static $inject = [
            '$window',
            '$q'
        ];

        constructor(
            private $window: any,
            private $q: any
            ) {
            this.deferred = $q.defer();
            this.promise = this.deferred.promise;
            $window.vcRecaptchaApiLoaded = this.getLoaded($window);
            if (angular.isDefined($window.grecaptcha)) {
                $window.vcRecaptchaApiLoaded();
            }
        }

        getLoaded($window) {
            return ()=> {
                this.recaptcha = $window.grecaptcha;
                this.deferred.resolve(this.recaptcha);
            };
        }

        getRecaptcha() {
            if (!!this.recaptcha) {
                return this.$q.when(this.recaptcha);
            }

            return this.promise;
        }

        validateRecaptchaInstance() {
            if (!this.recaptcha) {
                throw new Error('reCaptcha has not been loaded yet.');
            }
        }

        /**
         * Creates a new reCaptcha object
         *
         * @param elm  the DOM element where to put the captcha
         * @param key  the recaptcha public key (refer to the README file if you don't know what this is)
         * @param fn   a callback function to call when the captcha is resolved
         * @param conf the captcha object configuration
         */
        create (elm, key, fn, conf) {
            conf.callback = fn;
            conf.sitekey = key;

            return this.getRecaptcha().then(function (recaptcha) {
                return recaptcha.render(elm, conf);
            });
        }

        /**
         * Reloads the reCaptcha
         */
        reload (widgetId) {
            this.validateRecaptchaInstance();

            // $log.info('Reloading captcha');
            this.recaptcha.reset(widgetId);

            // reCaptcha will call the same callback provided to the
            // create function once this new captcha is resolved.
        }

        /**
         * Gets the response from the reCaptcha widget.
         *
         * @see https://developers.google.com/recaptcha/docs/display#js_api
         *
         * @returns {String}
         */
        getResponse (widgetId) {
            this.validateRecaptchaInstance();

            return this.recaptcha.getResponse(widgetId);
        }
    }
}
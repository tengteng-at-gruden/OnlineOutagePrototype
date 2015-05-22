﻿module map {
    'use strict';

    export class VcRecaptcha {
        public link: (scope, element, attrs, model) => void;
        public restrict: string;
        public require: string;
        public scope: {
        //response: '=?ngModel',
        //key: '=',
        //theme: '=?',
        //tabindex: '=?',
        //onCreate: '&',
        //onSuccess: '&',
        //onExpire: '&'
    }

        public static $inject = [
            '$document',
            '$timeout',
            'vcRecaptchaService'
        ];

        constructor(
            private $document: any,
            private $timeout: any,
            private vcRecaptchaService : IVcRecaptha
            ) {
            this.restrict = 'A';
            this.require = '?^^form';

            this.link = (scope, elm, attrs, ctrl) => {
                if (!attrs.hasOwnProperty('key')) {
                    this.throwNoKeyException();
                }

                scope.widgetId = null;

                var removeCreationListener = scope.$watch('key', function (key) {
                    if (!key) {
                        return;
                    }

                    if (key.length !== 40) {
                        this.throwNoKeyException();
                    }

                    var callback = function (gRecaptchaResponse) {
                        // Safe $apply
                        $timeout(function () {
                            if (ctrl) {
                                ctrl.$setValidity('recaptcha', true);
                            }
                            scope.response = gRecaptchaResponse;
                            // Notify about the response availability
                            scope.onSuccess({ response: gRecaptchaResponse, widgetId: scope.widgetId });
                            cleanup();
                        });

                        // captcha session lasts 2 mins after set.
                        $timeout(function () {
                            if (ctrl) {
                                ctrl.$setValidity('recaptcha', false);
                            }
                            scope.response = "";
                            // Notify about the response availability
                            scope.onExpire({ widgetId: scope.widgetId });
                        }, 2 * 60 * 1000);
                    };

                    vcRecaptchaService.create(elm[0], key, callback, {

                        theme: scope.theme || attrs.theme || null,
                        tabindex: scope.tabindex || attrs.tabindex || null

                    }).then(function (widgetId) {
                        // The widget has been created
                        if (ctrl) {
                            ctrl.$setValidity('recaptcha', false);
                        }
                        scope.widgetId = widgetId;
                        scope.onCreate({ widgetId: widgetId });

                        scope.$on('$destroy', cleanup);

                    });

                    // Remove this listener to avoid creating the widget more than once.
                    removeCreationListener();
                });

                function cleanup() {
                    // removes elements reCaptcha added.
                    angular.element($document[0].querySelectorAll('.pls-container')).parent().remove();
                }
            };
        }

        public static Factory($document, $timeout, vcRecaptcha) {
            var directive = () => {
                return new VcRecaptcha($document, $timeout, vcRecaptcha);
            };

            return directive;
        }

        private throwNoKeyException() {
            throw new Error('You need to set the "key" attribute to your public reCaptcha key. If you don\'t have a key, please get one from https://www.google.com/recaptcha/admin/create');
        }
    }
} 
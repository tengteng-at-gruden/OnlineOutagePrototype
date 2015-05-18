module map {
    'use strict';

    export class PlaceholderForAll {
        public link: (scope, element, attrs, model) => void;
        public restrict: string;
        public require: string;

        constructor() {
            this.restrict = 'A';
            this.require = 'ngModel';

            this.link = (scope, element, attrs, model) => {
                var value;

                var placehold = () => {
                    element.val(attrs.placeholder);
                    element.addClass('placeholder');
                };
                var unplacehold = () => {
                    element.val('');
                    element.removeClass('placeholder');
                };

                // detect modern browsers
                var dummy = document.createElement('input');
                if (dummy.placeholder != undefined) {
                    return;
                }

                scope.$watch(attrs.ngModel, val => {
                    value = val || '';
                });

                element.bind('focus', () => {
                    if (value == '') unplacehold();
                });

                element.bind('blur', () => {
                    if (element.val() == '') placehold();
                });

                model.$formatters.unshift(val => {
                    if (!val) {
                        placehold();
                        value = '';
                        return attrs.placeholder;
                    }
                    return val;
                });
            };
        }

        public static Factory() {
            var directive = () => {
                return new PlaceholderForAll();
            };

            return directive;
        }
    }
}
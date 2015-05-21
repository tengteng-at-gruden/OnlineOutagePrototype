module map {
    'use strict';

    export class ICheck {
        public link: (scope, element, attrs, model) => void;
        public restrict: string;
        public require: string;

        constructor() {
            this.restrict = 'A';
            this.require = 'ngModel';

            this.link = (scope, element, attrs, model) => {
                var value;
                value = attrs['value'];

                scope.$watch(attrs['ngModel'], newValue => {
                    $(element).iCheck('update');
                });

                return $(element).iCheck({
                    checkboxClass: 'icheckbox_minimal-grey',
                    radioClass: 'iradio_minimal-grey',
                    hoverClass: 'none'
                }).on('ifChanged', event => {
                    if ($(element).attr('type') === 'checkbox' && attrs['ngModel']) {
                        scope.$apply(() => model.$setViewValue((<HTMLInputElement>event.target).checked));
                    }
                    if ($(element).attr('type') === 'radio' && attrs['ngModel']) {
                        return scope.$apply(() => model.$setViewValue(value));
                    }
                });
            };
        }

        public static Factory() {
            var directive = () => {
                return new ICheck();
            };

            return directive;
        }
    }
} 
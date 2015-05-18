module map {
    'use strict';

    export class CustomRadio {
        public link: (scope, element, attrs, model) => void;
        public restrict: string;
        public require: string;

        constructor() {
            this.restrict = 'A';
            this.require = 'ngModel';

            this.link = (scope, element, attrs, model) => {
                var value = attrs['value'];
                var noValue = $(element).data('not-selected');

                $(element).radiobutton({
                    className: 'switch-off',
                    checkedClass: 'switch-on'
                }).on('change', function (event) {
                        if ($(element).attr('type') === 'radio' && attrs['ngModel']) {
                            return scope.$apply(function () {
                                if ($(element).attr('checked')) {
                                    return model.$setViewValue(value);
                                } else {
                                    return model.$setViewValue(noValue);
                                }
                            });
                        }
                    });
            };
        }

        public static Factory() {
            var directive = () => {
                return new CustomRadio();
            };

            return directive;
        }
    }
}
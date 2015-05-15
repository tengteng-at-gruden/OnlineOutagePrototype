module map {
    'use strict';

    export function CustomRadio(): ng.IDirective {
        return {
            restrict: 'A',
            require: 'ngModel',

            link: (scope: IMapScope, element: Element, attrs: any, model) => {
                var value = attrs['value'];
                var noValue = $(element).data('not-selected');

                $(element).radiobutton({
                    className: 'switch-off',
                    checkedClass: 'switch-on'
                }).on('change', function(event) {
                    if ($(element).attr('type') === 'radio' && attrs['ngModel']) {
                        return scope.$apply(function() {
                            if ($(element).attr('checked')) {
                                return model.$setViewValue(value);
                            } else {
                                return model.$setViewValue(noValue);
                            }
                        });
                    }
                });
            }
        };
    }
}
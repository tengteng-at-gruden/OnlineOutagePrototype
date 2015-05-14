/// <reference path='../_all.ts' />

module map {
    'use strict';

    export function customRadio(): ng.IDirective {
        return {
            restrict: 'A',
            require: 'ngModel',

            link($scope: IMapScope, $element: JQuery, attrs: any, model) {
                var value = attrs['value'];
                var noValue = $($element).data('not-selected');
                $scope.$watch('vm.mRadValue', () => {
                    if ($($element).attr('type') === 'radio' && attrs['ngModel']) {
                        return $scope.$apply(() => {
                            if ($($element).attr('checked')) {
                                return model.$setViewValue(value);
                            } else {
                                return model.$setViewValue(noValue);
                            }
                        });
                    }
                });
            }
        }
    }
}
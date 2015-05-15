module map {
    'use strict';

    export function CustomSelectBox(): ng.IDirective {
        return {
            restrict: 'A',
            require: 'ngModel',

            link: (scope, element, attrs, model) => {
                $(element).selectbox();
            }
        };
    }
}
module map {
    'use strict';

    export function PlaceholderForAll(): ng.IDirective {
        return {
            restrict: 'A',
            require: 'ngModel',

            link: function (scope, element, attrs, model) {
                var value;

                var placehold = function () {
                    element.val(attrs.placeholder);
                    element.addClass('placeholder');
                };
                var unplacehold = function () {
                    element.val('');
                    element.removeClass('placeholder');
                };

                // detect modern browsers
                var dummy = document.createElement('input');
                if (dummy.placeholder != undefined) {
                    return;
                }

                scope.$watch(attrs.ngModel, function (val) {
                    value = val || '';
                });

                element.bind('focus', function () {
                    if (value == '') unplacehold();
                });

                element.bind('blur', function () {
                    if (element.val() == '') placehold();
                });

                model.$formatters.unshift(function (val) {
                    if (!val) {
                        placehold();
                        value = '';
                        return attrs.placeholder;
                    }
                    return val;
                });
            }
        };
    }
}
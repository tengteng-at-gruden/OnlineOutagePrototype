module map {
    'use strict';

    export class NotAllowedCharacters {
        public link: (scope, element, attrs, model) => void;
        public restrict: string;
        public require: string;

        constructor() {
            this.restrict = 'A';
            this.require = 'ngModel';

            this.link = (scope, element, attrs, model) => {
                var notAllowedCharacters = ["<", ">", "{", "}", "(", ")", "[", "]", "'", "\""];

                function validate() {
                    var newValue = model.$viewValue;

                    for (var i = 0; i < notAllowedCharacters.length; i++) {
                        if (newValue.indexOf(notAllowedCharacters[i]) === -1) {
                            model.$setValidity('notAllowedCharacters', true);
                            $(element).siblings('.not-allowed-message').remove();
                        } else {
                            model.$setValidity('notAllowedCharacters', false);
                            if ($(element).siblings('.not-allowed-message').length == 0) {
                                $(element).after("<span class='not-allowed-message'>The text fields should not allow braces or quotes &lt;&gt;(){}[]&quot'</span>");
                            }
                            break;
                        }
                    }
                }

                scope.$watch(() => model.$viewValue, validate);
            };
        }

        public static Factory() {
            var directive = () => {
                return new NotAllowedCharacters();
            };

            return directive;
        }
    }
} 
module map {
    'use strict';

    export class CustomSelectBox {
        public link: (scope, element, attrs, model) => void;
        public restrict: string;
        public require: string;

        constructor() {
            this.restrict = 'A';
            this.require = 'ngModel';

            this.link = (scope, element, attrs, model) => {
                $(element).selectbox();
            };
        }

        public static Factory() {
            var directive = () => {
                return new CustomSelectBox();
            };

            return directive;
        }
    }
}
module map {
    'use strict';

    /**
     * Directive that executes an expression when the element it is applied to loses focus.
     */
    export class GooglePlace {
        public link: (scope, element, attrs, model) => void;
        public restrict: string;
        public require: string;

        constructor() {
            this.restrict = 'A';
            this.require = 'ngModel';

            this.link = (scope, element, attrs, model) => {
                var options = {
                    types: ['geocode'],
                    componentRestrictions: { country: 'au' }
                };

                var gPlace = new google.maps.places.Autocomplete(element[0]);

                var geocoder = new google.maps.Geocoder();

                google.maps.event.addListener(gPlace, 'place_changed', function () {

                    var place = gPlace.getPlace();

                    if (!place.geometry) {
                        return;
                    }
                    if (place.geometry.viewport) {
                        scope.map.fitBounds(place.geometry.viewport);

                    } else {
                        scope.map.setCenter(place.geometry.location);
                    }            
                    
                });
            };
        }

        public static Factory() {
            var directive = () => {
                return new GooglePlace();
            };

            return directive;
        }
    }
} 
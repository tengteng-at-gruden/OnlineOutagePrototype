
module map {
    'use strict';

    /**
     * Directive that executes an expression when the element it is applied to loses focus.
     */
    export function GooglePlace(): ng.IDirective {
        return {
            link: (scope: IHomeScope, element: Element, attributes: any) => {
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
                        scope.map.setZoom(18);
                    } else {
                        scope.map.setCenter(place.geometry.location);
                        scope.map.setZoom(18);
                    }            
                    
                });
            }
        };
    }
} 
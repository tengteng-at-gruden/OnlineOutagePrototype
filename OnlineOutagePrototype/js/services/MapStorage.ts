 /// <reference path='../_all.ts' />

module map {
    'use strict';

    export class MapStorage implements IMapStorage {

        private infoBoxArray: any;
        private markersArray: any;
        private geocoder: google.maps.Geocoder;
        private content: string;
        private compiled: any;

        public static $inject = [
            'poleData'
        ];

        constructor(
            private outageData: IOutageData
            ) {
            this.infoBoxArray = [];
            this.markersArray = [];
        }

        initializeMap($scope: any, $compile: any) {

            $("#outageInfo").hide();

            var mySettings = {
                defaultLati: -33.867487,
                defaultLongi: 151.20699,
                NSW_NE_lat: -27.664069,
                NSW_NE_lng: 154.35791,
                NSW_SW_lat: -44.197959,
                NSW_SW_lng: 137.175293,
            };

            $scope.chosenPlace = '';
            $scope.radOutageTime = 'now';
            $scope.isLoading = false;

            $scope.marker = {};
            $scope.markerAddress = '';
            $scope.markerStatue = '';

            this.geocoder = new google.maps.Geocoder();

            this.content = '<div id="infowindow_content" ng-include src="\'/views/infobox.html\'"></div>';
            this.compiled = $compile(this.content)($scope);

            var opts: google.maps.MapOptions = {
                center: new google.maps.LatLng(mySettings.defaultLati, mySettings.defaultLongi),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDoubleClickZoom: true,
                zoomControlOptions: { style: google.maps.ZoomControlStyle.SMALL },
                streetViewControl: false,
                mapTypeControl: false,
                bounds: new google.maps.LatLngBounds(
                    new google.maps.LatLng(mySettings.NSW_SW_lat, mySettings.NSW_SW_lng),
                    new google.maps.LatLng(mySettings.NSW_NE_lat, mySettings.NSW_NE_lng))
            };

            $scope.map = new google.maps.Map(document.getElementById('myMap'), opts);

            $scope.map.setZoom(14);
        }

        showMarkers($scope: any, timeStatus: string): void {
            var thisScope = this;
            var zoom = $scope.map.getZoom();

            if (zoom > 17) {

                var bounds = $scope.map.getBounds();
                var ne = bounds.getNorthEast();
                var sw = bounds.getSouthWest();
                var viewbox = {
                    "bottomleft": { "lat": sw.lat(), "lng": sw.lng() },
                    "topright": { "lat": ne.lat(), "lng": ne.lng() }
                };

                // retrieve poles from Ausgrid service
                this.outageData.getOutages({ box: viewbox },timeStatus).then(function (result) {
                    if (result.d) {
                        thisScope.setMarkers(result.d, $scope);
                        $scope.isLoading = false;
                    }
                }, function (error) {

                    });
            } else {
                this.resetMarkers();
            }   
        }

        setMarkers(assets: any, $scope: any) {

            var imageURL = '/images/Status_Sprites.png';
            var workingImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(1, 1));
            var reportedImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(23, 1));
            var heldImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(45, 1));
            var nonausgridImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(67, 1));

            var workingHoverImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(1, 23));
            var reportedHoverImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(23, 23));
            var heldHoverImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(45, 23));
            var nonausgridHoverImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(67, 23));

            for (var index in assets) {
                if (assets[index].lat) {

                    var location = new google.maps.LatLng(assets[index].lat, assets[index].lng);

                    var image = workingImage;
                    var hoverImage = workingHoverImage;
                    if (assets[index].Status == 'reported') {
                        image = reportedImage;
                        hoverImage = reportedHoverImage;
                    }
                    else if (assets[index].Status == 'held') {
                        image = heldImage;
                        hoverImage = heldHoverImage;
                    }
                    else if (assets[index].Status == 'nonausgrid') {
                        image = nonausgridImage;
                        hoverImage = nonausgridHoverImage;
                    }

                    var marker = new google.maps.Marker({
                        position: location,
                        map: $scope.map,
                        icon: image,
                        title: assets[index].AssetNo,
                        customStatus: assets[index].Status,
                        webID: assets[index].WebID,
                    });

                    this.markersArray.push(marker);

                    this.attachInfoBox(marker, $scope);
                }
            }
        }

        attachInfoBox(marker, $scope : any) {
            var thisScope = this;

            //add click handler
            google.maps.event.addListener(marker, 'click', () => {
                thisScope.clickMarker(marker, $scope);
            });
        }

        clickMarker(marker: any, $scope:any) {

            $("#outageInfo").toggle('slide', {direction: 'right'});   

            var geocoder = new google.maps.Geocoder();

            var geocoderRequest = {
                address: '',
                location: marker.getPosition()
            }

            geocoder.geocode(geocoderRequest, (results, status) => {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        // hacking: sometime ng-include is not working for second time
                        $scope.marker = marker;
                        $scope.markerAddress = results[0].formatted_address;
                        $scope.$apply();
                    }
                }
            });

            this.offsetCenter(marker.getPosition(), $scope);

            var circleOptions = {
                strokeColor: marker.customStatus == "working"?'#00D1F4':'#E76E25',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: marker.customStatus == "working" ?'#00D1F4':'#E76E25',
                fillOpacity: 0.35,
                map: $scope.map,
                radius: 100
            };
            // Add the circle for this city to the map.
            var markerCircle = new google.maps.Circle(circleOptions);

            markerCircle.bindTo("center", marker, "position");
        }

        offsetCenter(latlng, $scope: any) {
            var scale = Math.pow(2, $scope.map.getZoom());
            var offsetx = -($('#outageInfo').width() / 2);

            var worldCoordinateCenter = $scope.map.getProjection().fromLatLngToPoint(latlng);

            var pixelOffset = new google.maps.Point((offsetx / scale) || 0, 0);

            var worldCoordinateNewCenter = new google.maps.Point(
                worldCoordinateCenter.x - pixelOffset.x,
                worldCoordinateCenter.y
                );

            var newCenter = $scope.map.getProjection().fromPointToLatLng(worldCoordinateNewCenter);

            $scope.map.panTo(newCenter);
        }
        //clear all current markers
        resetMarkers() {
            if (this.markersArray.length) {
                for (var i = 0; i < this.markersArray.length; i++) {
                    this.markersArray[i].setMap(null);
                }
                this.markersArray.length = 0;
            }
        }
    }
}
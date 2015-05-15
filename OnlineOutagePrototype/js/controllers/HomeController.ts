/// <reference path='../_all.ts' />

module map {
    'use strict';

    export class HomeController {

        private geocoder: any;
        private infoWindowArray: any;
        private infoBoxArray: any;
        private markersArray: any;
        private content: any;
        private compiled: any;

        public static $inject = [
            '$scope',
            '$location',
            '$compile',
            '$http'
        ];

        constructor(
            private $scope: IHomeScope,
            private $location: ng.ILocationService,
            private $compile,
            private $http: ng.IHttpService
            ) {
            var mySettings = {
                defaultLati: -33.867487,
                defaultLongi: 151.20699,
                NSW_NE_lat : -27.664069,
                NSW_NE_lng : 154.35791,
                NSW_SW_lat : -44.197959,
                NSW_SW_lng : 137.175293,
            };
            $scope.chosenPlace = '';
            $scope.isLoading = false;
            $scope.homeVm = this;
            $scope.marker = {};
            $scope.markerAddress = '';
            $scope.markerStatue = '';

            this.infoWindowArray = [];
            this.infoBoxArray = [];
            this.markersArray = [];
            this.geocoder = new google.maps.Geocoder();

            //var content = '<div id="infowindow_content" ng-include src="\'/views/infowindow.html\'"></div>';
            var content = '<div id="infowindow_content" ng-include src="\'/views/infobox.html\'"></div>';
            this.compiled = $compile(content)($scope); 

            var mapOptions = {
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

            $scope.map = new google.maps.Map(document.getElementById('myMap'), mapOptions);

            $scope.map.setZoom(14);
        }

        searchAddress() {

            var $scope = this.$scope;
            var $this = this;
            var geocodeRequest = {
                'address': $scope.chosenPlace,
                'bounds': new google.maps.LatLngBounds(
                    new google.maps.LatLng(-27.664069, 154.35791),
                    new google.maps.LatLng(-44.197959, 137.175293)),
                'location': $scope.map.getCenter(),
                'region': 'aus'
            };
           
           //this.geocoder.geocode(
           //    geocodeRequest,
           //    function (results, status) {
           //        if (status == google.maps.GeocoderStatus.OK) {
           //            var loc = results[0].geometry.location;        
           //            $scope.map.setCenter(loc);
                       
           //        } else {
           //            alert("No result Found");
           //        }
           //    });
            $scope.map.setZoom(18);
            $this.showMarkers();
        }

        showMarkers() {
            var $this = this;
            var poleData = new PoleData(this.$http);
            var zoom = this.$scope.map.getZoom();
            if (zoom > 17) {
                var bounds = this.$scope.map.getBounds();
                var ne = bounds.getNorthEast();
                var sw = bounds.getSouthWest();
                var viewbox = {
                    "bottomleft": { "lat": sw.lat(), "lng": sw.lng() },
                    "topright": { "lat": ne.lat(), "lng": ne.lng() }
                };

                // retrieve poles from Ausgrid service
                poleData.getPoles({ box: viewbox }).then(function (result) {
                    if (result.d) {
                        $this.setMarkers(result.d);
                        $this.$scope.isLoading = false;                    
                    }
                }, function (error) {

                    });
                } else {
                    $this.resetMarkers();
                    $this.resetInfoBoxes();
                }   

        }

        setMarkers(assets: any) {
            var $this = this;

            var imageURL = '/images/Status_Sprites.png';
            var workingImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(1, 1));
            var reportedImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(23, 1));
            var heldImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(45, 1));
            var nonausgridImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(67, 1));

            var workingHoverImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(1, 23));
            var reportedHoverImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(23, 23));
            var heldHoverImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(45, 23));
            var nonausgridHoverImage = new google.maps.MarkerImage(imageURL, new google.maps.Size(21, 21), new google.maps.Point(67, 23));

            var count = 0;
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
                        map: $this.$scope.map,
                        icon: image,
                        title: assets[index].AssetNo,
                        customStatus: assets[index].Status,
                        webID: assets[index].WebID,
                    });

                    this.markersArray.push(marker);
                    
                    this.attachInfoBox(marker);   
                }
            }
        }

        attachInfoBox(marker) {
            var $this = this;
            var myOptions = {
                disableAutoPan: false
                , pixelOffset: new google.maps.Size(-140, 0)
                , zIndex: null
                , closeBoxMargin: "10px 2px 2px 2px"
                , closeBoxURL: "/images/close.png"
                , infoBoxClearance: new google.maps.Size(1, 1)
                , isHidden: false
                , pane: "floatPane"
                , enableEventPropagation: false
            };

            var ib = new google.maps.InfoWindow(myOptions);

            this.infoBoxArray.push(ib);
            //add click handler
            google.maps.event.addListener(marker, 'click', function () {
                $this.clickMarker(marker, ib)
            });
        }

        clickMarker(marker, infobox) {
            var $this = this;
            this.geocoder.geocode({ 'latLng': marker.getPosition() }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        // hacking: sometime ng-include is not working for second time
                        if (!$this.compiled[0].nextSibling) {
                            $this.compiled = $this.$compile($this.content)($this.$scope);
                        }

                        $this.$scope.marker = marker;
                        $this.$scope.markerAddress = results[0].formatted_address;

                        $this.$scope.$apply();
                        infobox.setContent($this.compiled[0].nextSibling.innerHTML);

                        //resetInfoBoxes();
                        infobox.open($this.$scope.map, marker);

                        //close button hover state change
                        google.maps.event.addListener(infobox, 'domready', function () {
                            //Have to put this within the domready or else it can't find the div element (it's null until the InfoBox is opened)

                            $(infobox.div_).find('img[src="/images/close.png"]').hover(
                                function () {
                                    //This is called when the mouse enters the element
                                    $(this).attr('src', '/images/close-hover.png');
                                },
                                function () {
                                    //This is called when the mouse leaves the element
                                    $(this).attr('src', '/images/close.png');
                                }
                                );
                        });
                    }
                }
            });
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
        resetInfoBoxes() {
            if (this.infoBoxArray.length) {
                for (var i = 0; i < this.infoBoxArray.length; i++) {
                    this.infoBoxArray[i].close();
                }
            }
        }
        reportAsset() {
            this.$location.path('/report');
        }
    }

}

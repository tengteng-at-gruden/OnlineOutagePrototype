module map {
    export interface IHomeScope extends ng.IScope {
        chosenPlace: string;
        isLoading: boolean;
        marker: any;
        markerAddress: string;
        markerStatue: string;
        map: google.maps.Map;
        mapOptions: google.maps.MapOptions;
        homeVm: HomeController;
    }
}
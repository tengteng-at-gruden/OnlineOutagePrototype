/// <reference path='_all.ts' />

module map {
    'use strict';

    var map = angular.module('map', ['uiGmapgoogle-maps'])
        .controller('rootController', RootController)
        .controller('introController', IntroController)
        .controller('homeController', HomeController)
        .controller('formController', FormController)
        ;
}

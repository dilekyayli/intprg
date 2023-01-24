// This file can be replaced during build by using the 'fileReplacemnts' array.
// 'ng build' replaces 'environment.ts' with 'environment.prod.ts'.
// The list of file replacements can be found in 'angular.json'.

import { NgZone } from "@angular/core";

export const environment = {
    firebase: {
        projectId: 'intprg',
        appId: '1:953598839257:web:022332def5f0ab03e371c8',
        apiKey: 'AIzaSyD3vjyphgkVI3ur5H4qxp7lBByqFcLDTzs',
        messagingSenderId: '567974556773',
    },
    production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as zone.run', 'zoneDelegate.invokeTask'.
 * 
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 * /
 */// import 'zone.js/plugins/NgZone-error'; // Included with Angular CLI.

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { LogLevel } from "angular-auth-oidc-client";
import atlas from "azure-maps-control";
import { AzureMapsModule } from 'ng-azure-maps';
import { NgxUiLoaderConfig } from "ngx-ui-loader";

export const environment = {
    production: false,
    apiURL: 'https://localhost:7068/api/',
    api360URL: 'https://api.trayecto.digital/corp/api/',
    clientConf: {
        configId: 'authserver',
        authority: 'https://login.trayecto.digital',
        redirectUrl: window.location.origin + '/loggedin',
        postLogoutRedirectUri: window.location.origin,
        clientId: 'MaestroDes',
        scope: 'openid profile apiMaestro api360',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.None
    }
    // ,
    // authOptions:{
    //   authType: atlas.AuthenticationType.subscriptionKey,
    //   subscriptionKey: 'SoT90s7fwMCiJLwjJDKbHYQFRS7MJ0xh7AWD-nvvoGA'
    //   //subscriptionKey: 'mBzAxxwmSo6VmbpbwcuXAcDGW1dldW833tjMIi_5-AM'
    //   //authType: atlas.AuthenticationType.anonymous,
    //   //subscriptionKey: '3f0d41b8-9c78-454c-a1a6-76c7e344d96c'
    // }
};

export const loaderconfiguration: NgxUiLoaderConfig =
{
  "bgsColor": "#ffb700",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "ball-spin-clockwise",
  "blur": 5,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "#ffb700",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "ball-spin-clockwise",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "#ffb700",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

import { LogLevel } from "angular-auth-oidc-client";
import { NgxUiLoaderConfig } from "ngx-ui-loader";

export const environment = {
    production: true,
    apiURL: 'https://apimaestro.sip360.net/api/',
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

import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule } from 'angular-auth-oidc-client';
import { environment, loaderconfiguration } from 'environments/environment';
import { TokenInterceptor } from './shared/Services/auth/token.interceptor';
import { AuthGuard } from './shared/Services/auth/auth.guard';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import  { ToastrModule }  from 'ngx-toastr' ;
import { ToastContainerModule } from 'ngx-toastr';

import { AzureMapsModule } from 'ng-azure-maps';
// import atlas from 'azure-maps-control';
import * as atlas from 'azure-maps-control';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

const routerConfig: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    preloadingStrategy       : PreloadAllModules
};

@NgModule({
    declarations: [
        AppComponent,
      
    ],
    imports     : [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastContainerModule,
        ToastrModule . forRoot ({
            timeOut : 4000 , 
            positionClass : 'toast-top-right' , 
            preventDuplicates : true, 
        }),
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,

        HttpClientModule,

        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),
        AuthModule.forRoot({
            config: environment.clientConf
        }),
        NgxUiLoaderModule.forRoot(loaderconfiguration),

        AzureMapsModule.forRoot({
            authOptions: {
                authType: atlas.AuthenticationType.subscriptionKey,
                subscriptionKey: 'SoT90s7fwMCiJLwjJDKbHYQFRS7MJ0xh7AWD-nvvoGA'
            }
        })
    ],
    providers: [
        AuthGuard,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}

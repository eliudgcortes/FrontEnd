/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenService {
    private bool_TieneToken: BehaviorSubject<boolean>;

    constructor(
      public oidcSecurityService: OidcSecurityService) {
        this.bool_TieneToken = new BehaviorSubject<boolean>(false);
      }

    public fn_ObtenerToken(): void{
      const token  = this.oidcSecurityService.getAccessToken();

      if (token !== '') {
        this.bool_TieneToken.next(true);
      } else {
        this.bool_TieneToken.next(false);
      }
    }

    public fn_ObtenerTieneToken(): Observable<boolean> {
      return this.bool_TieneToken.asObservable();
    }
}

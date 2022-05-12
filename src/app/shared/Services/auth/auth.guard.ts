import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    public authToken;

    constructor(
        public oidcSecurityService: OidcSecurityService,
        private _userService: UserService
    ) {}

    async canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<boolean> {
        try {
            const auth =  await this.oidcSecurityService.checkAuth().toPromise();
            if (auth.isAuthenticated === false) {
                this.oidcSecurityService.authorize();
                return false;
            }else{
                this._userService.user = {
                    id      : auth.userData.sub,
                    name    : auth.userData.name,
                    email   : auth.userData.email
                };
                return true;
            }
        } catch (error) {
            return false;
        }
    }

    async canActivateChild(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<boolean> {
        try {
            const auth =  await this.oidcSecurityService.checkAuth().toPromise();
            if (auth.isAuthenticated === false) {
                this.oidcSecurityService.authorize();
                return false;
            }else{
                return true;
            }
        } catch (error) {
            return false;
        }
    }
}

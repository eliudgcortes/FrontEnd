import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.scss']
})
export class LoggedinComponent implements OnInit {

  constructor(private oidcSecurityService: OidcSecurityService,
    private router: Router) { }

    ngOnInit(): void {

        this.oidcSecurityService.getRefreshToken();

        this.oidcSecurityService.checkAuth().subscribe((auth) => {
            console.log('is authenticated', auth);

            if(auth.isAuthenticated === false) {
                this.router.navigate(['/clientes', { replaceUrl: true }]);
            }
        });
    }

}

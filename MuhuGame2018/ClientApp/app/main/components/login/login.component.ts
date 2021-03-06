import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, AuthenticationService } from '../../../shared/_services';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        //this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        if (this.route.snapshot.routeConfig.path === "logout") {
            this.logout();
        }
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    if (this.authenticationService.isAdmin()) {
                        this.router.navigate(['/admin']);
                    }
                    else {
                        this.router.navigate([`/registration/${data.id}`]);
                    }
                },
                error => {
                    this.alertService.error('Zadaná kombinace jména a hesla není správná!');
                    this.loading = false;
                });
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate([this.returnUrl]);
    }
}
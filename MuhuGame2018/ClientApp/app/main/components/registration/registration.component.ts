import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, UserService } from '../../../shared/_services';
import { Team } from '../../_models';

@Component({
    selector: 'registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
    model: Team = new Team();
    loading: boolean = false;
    temporaryDisabled: boolean = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
    ) { 

    }

    ngOnInit() {
    }

    register() {
        this.loading = true;
        // this.userService.create(this.model)
        //     .subscribe(
        //         data => {
        //             this.alertService.success('Registration successful', true);
        //             this.router.navigate(['/login']);
        //         },
        //         error => {
        //             this.alertService.error(error._body);
        //             this.loading = false;
        //         });
    }
}

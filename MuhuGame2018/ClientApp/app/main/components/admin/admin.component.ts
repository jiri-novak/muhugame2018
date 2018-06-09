import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../shared/_services';
import { Subscription } from 'rxjs';
import { User } from '../../../shared/_models';

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
    selected: User = new User();

    constructor(private userService: UserService) {
    }

    teamSelected(user: User) {
        console.log(`selected ${user.name}`);
        this.selected = user;
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        
    }
}

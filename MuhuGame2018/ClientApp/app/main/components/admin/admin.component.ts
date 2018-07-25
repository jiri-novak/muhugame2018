import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { User } from '../../../shared/_models';
import { ParticipantsComponent } from '../participants/participants.component';
import { Subscription } from 'rxjs';
import { ParticipantsSummary } from '../../_models';
import { UserService, AuthenticationService } from '../../../shared/_services';
import { saveAs } from 'file-saver/FileSaver';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
    selected: User = new User();
    summarySubscription: Subscription;
    summary: ParticipantsSummary;
    returnUrl: string;
    exporting: boolean;

    @ViewChild('participants') participants: ParticipantsComponent;

    constructor(private userService: UserService, private authenticationService: AuthenticationService, private route: ActivatedRoute, private router: Router) {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        let token: string = this.authenticationService.getToken();
        if (this.authenticationService.isTokenExpired(token)) {
            this.authenticationService.logout();
            this.router.navigate(['/login']);
        }
    }
    
    teamSelected(user: User) {
        console.log(`selected ${user.name}`);
        this.selected = user;
    }

    ngOnInit(): void {
        this.summarySubscription = this.participants.summary.subscribe(x => {
            this.summary = x;
        });
    }

    ngOnDestroy(): void {
        if (this.summarySubscription) {
            this.summarySubscription.unsubscribe();
        }
    }

    export() {
        this.exporting = true;
        this.userService.export().subscribe(res => {
            const fileName = this.getFileNameFromResponseContentDisposition(res);
            this.saveFile(res.blob(), fileName);
            this.exporting = false;
        });
    }

    private saveFile = (blobContent: Blob, fileName: string) => {
        const blob = new Blob([blobContent], { type: 'application/octet-stream' });
        saveAs(blob, fileName);
    };

    private getFileNameFromResponseContentDisposition = (res: Response) => {
        const contentDisposition = res.headers.get('content-disposition') || '';
        const matches = /filename=([^;]+)/ig.exec(contentDisposition);
        const fileName = (matches[1] || 'untitled').trim();
        return fileName;
    };
}

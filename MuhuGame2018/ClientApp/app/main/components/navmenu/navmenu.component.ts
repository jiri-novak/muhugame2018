import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.scss']
})
export class NavMenuComponent implements OnInit {
    isCollapsed: boolean = true;

    ngOnInit(): void {
    }
}

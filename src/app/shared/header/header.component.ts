import {Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'fz-app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {

    @Output() toggle = new EventEmitter<void>();
    @Output() toggleDarkTheme = new EventEmitter<boolean>();

    constructor() {
        // this.auth$ = this.store$.select(fromRoot.getAuth);
    }

    ngOnInit() {
    }

    openSidebar() {
        this.toggle.emit();
    }

    onChage(checked: boolean) {
        this.toggleDarkTheme.emit(checked);
    }

    logout() {
        // this.store$.dispatch({type: actions.ActionTypes.LOGOUT});
    }

}

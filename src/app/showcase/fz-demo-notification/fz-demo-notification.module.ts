import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FzDemoNotificationComponent} from './fz-demo-notification.component';
import {FzDemoNotificationRoutingModule} from './fz-demo-notification-routing.module';
import {FzNoticeIconModule} from '../../../lib/components/notice-icon/notice-icon.module';

@NgModule({
    imports: [
        CommonModule,
        FzNoticeIconModule,
        FzDemoNotificationRoutingModule
    ],
    declarations: [FzDemoNotificationComponent]
})
export class FzDemoNotificationModule {
}

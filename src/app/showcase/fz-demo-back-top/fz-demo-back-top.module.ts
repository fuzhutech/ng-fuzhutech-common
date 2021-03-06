import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material';
import {FzDemoBackTopComponent} from './fz-demo-back-top.component';
import {FzDemoBackTopRoutingModule} from './fz-demo-back-top-routing.module';
import {FzBackTopModule} from '../../../lib/components/back-top/back-top.module';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        FzBackTopModule,
        FzDemoBackTopRoutingModule
    ],
    declarations: [FzDemoBackTopComponent]
})
export class FzDemoBackTopModule {
}

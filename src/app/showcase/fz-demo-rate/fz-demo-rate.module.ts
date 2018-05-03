import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FzDemoRateComponent} from './fz-demo-rate.component';
import {FzDemoRateRoutingModule} from './fz-demo-rate-routing.module';
import {FormsModule} from '@angular/forms';
import {FzRateModule} from '../../../lib/components/rate/rate.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FzRateModule,
        FzDemoRateRoutingModule
    ],
    declarations: [FzDemoRateComponent]
})
export class FzDemoRateModule {
}

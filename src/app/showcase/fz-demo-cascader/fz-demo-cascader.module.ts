import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FzDemoCascaderComponent} from './fz-demo-cascader.component';
import {FzDemoCascaderRoutingModule} from './fz-demo-cascader-routing.module';
import {FormsModule} from '@angular/forms';
import {FzCascaderModule} from '../../../lib/components/cascader/cascader.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FzCascaderModule,
        FzDemoCascaderRoutingModule
    ],
    declarations: [FzDemoCascaderComponent]
})
export class FzDemoCascaderModule {
}

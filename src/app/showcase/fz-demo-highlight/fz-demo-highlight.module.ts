import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FzDemoHighlightComponent} from './fz-demo-highlight.component';
import {FzDemoHighlightRoutingModule} from './fz-demo-highlight-routing.module';
import {FzHighlightModule} from '../../../lib/components/highlight/highlight.module';

@NgModule({
    imports: [
        CommonModule,
        FzHighlightModule,
        FzDemoHighlightRoutingModule
    ],
    declarations: [FzDemoHighlightComponent]
})
export class FzDemoHighlightModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FzDemoAnchorComponent} from './fz-demo-anchor.component';
import {FzDemoAnchorRoutingModule} from './fz-demo-anchor-routing.module';
import {FzAnchorModule} from '../../../lib/components/anchor/anchor.module';
import {FzAffixModule} from '../../../lib/components/affix/affix.module';

@NgModule({
    imports: [
        CommonModule,
        FzAnchorModule,
        FzAffixModule,
        FzDemoAnchorRoutingModule
    ],
    declarations: [FzDemoAnchorComponent]
})
export class FzDemoAnchorModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer.component';
import {MatToolbarModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule
    ],
    declarations: [
        FooterComponent
    ],
    exports: [
        FooterComponent
    ]
})
export class FzFooterModule {
}

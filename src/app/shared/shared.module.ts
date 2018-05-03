import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FzAppHeaderModule} from './header/header.module';

@NgModule({
    imports: [
        CommonModule,
        FzAppHeaderModule
    ],
    declarations: [],
    exports: [
        FzAppHeaderModule
    ]
})
export class SharedModule {
}

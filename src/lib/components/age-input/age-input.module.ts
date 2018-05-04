import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatButtonToggleModule, MatNativeDateModule} from '@angular/material';
import {AgeInputComponent} from './age-input.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatNativeDateModule
    ],
    declarations: [AgeInputComponent],
    exports: [AgeInputComponent]
})
export class FzAgeInputModule {
}

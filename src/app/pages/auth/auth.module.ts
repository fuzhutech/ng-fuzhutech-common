import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule, MatInputModule, MatTabsModule} from '@angular/material';
import {RequestPasswordComponent} from './request-password/request-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {FzImageListSelectModule} from '../../../lib/components/image-list-select/image-list-select.module';
import {FzIdentityInputModule} from '../../../lib/components/identity-input/identity-input.module';
import {FzAgeInputModule} from '../../../lib/components/age-input/age-input.module';
import {FzAreaListModule} from '../../../lib/components/area-list/area-list.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatTabsModule,
        FzAgeInputModule,
        FzAreaListModule,
        FzImageListSelectModule,
        FzIdentityInputModule,
        AuthRoutingModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        RequestPasswordComponent,
        ResetPasswordComponent
    ]
})
export class AuthModule {
}

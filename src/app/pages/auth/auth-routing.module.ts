import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {RequestPasswordComponent} from './request-password/request-password.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
    {path: '', redirectTo: 'register', pathMatch: 'full'},
    {path: 'login', component: LoginComponent, data: {title: '登录'}},
    {path: 'register', component: RegisterComponent, data: {title: '注册'}},
    {path: 'request-password', component: RequestPasswordComponent, data: {title: '请求密码'}},
    {path: 'reset-password', component: ResetPasswordComponent, data: {title: '重置密码'}},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}

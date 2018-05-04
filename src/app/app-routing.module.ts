import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: './home/home.module#HomeModule',
        data: {layout: 'full'}
    },
    {path: 'login', redirectTo: 'auth/login', pathMatch: 'full'},
    {path: 'register', redirectTo: 'auth/register', pathMatch: 'full'},
    {
        path: 'auth',
        loadChildren: './pages/auth/auth.module#AuthModule',
        data: {layout: 'full'}
    },
    {
        path: 'showcase',
        loadChildren: './showcase/showcase.module#ShowcaseModule',
        data: {title: 'showcase', module: 'showcase', power: 'SHOW'}
    },
    {
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule',
        data: {title: 'pages', module: 'pages', power: 'SHOW'}
    }/*,
    { path: '**', component: NotFound }*/
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

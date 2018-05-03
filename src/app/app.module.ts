import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {OverlayModule} from '@angular/cdk/overlay';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FzPrismModule} from '../lib/core/prism/prism.module';
import {FzLayoutModule} from '../lib/components/layout/layout.module';
import {SharedModule} from './shared/shared.module';
import {FzFooterModule} from '../lib/components/footer/footer.module';
import {FzMessageModule} from '../lib/components/message/message.module';
import {CoreModule} from './core/core.module';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        OverlayModule,
        FzLayoutModule.forRoot(null),
        FzPrismModule.forRoot({
            // 指定ueditor.js路径目录
            path: 'assets/js',
            // 默认全局配置项
            options: {
                // themePath: '/assets/ueditor1_4_3_3-utf8-jsp/themes/'
            }
        }),
        SharedModule,
        CoreModule,
        FzFooterModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

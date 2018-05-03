import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FzDemoCarouselComponent} from './fz-demo-carousel.component';
import {FzDemoCarouselRoutingModule} from './fz-demo-carousel-routing.module';
import {FzCarouselModule} from '../../../lib/components/carousel/carousel.module';

@NgModule({
    imports: [
        CommonModule,
        FzCarouselModule,
        FzDemoCarouselRoutingModule
    ],
    declarations: [FzDemoCarouselComponent]
})
export class FzDemoCarouselModule {
}

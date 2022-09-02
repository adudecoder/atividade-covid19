import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

//Components
import { CardsComponent } from './components/cards/cards.component';
import { ListStatesComponent } from './components/list-states/list-states.component';
import { MapComponent } from './components/map/map.component';
import { PieChartGraphicComponent } from './components/pie-chart-graphic/pie-chart-graphic.component';

@NgModule({
  declarations: [
    CardsComponent,
    ListStatesComponent,
    MapComponent,
    PieChartGraphicComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CardsComponent,
    ListStatesComponent,
    MapComponent,
    PieChartGraphicComponent
  ]
})
export class HomeModule { }

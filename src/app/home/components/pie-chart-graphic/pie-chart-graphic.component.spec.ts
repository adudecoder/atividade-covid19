import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartGraphicComponent } from './pie-chart-graphic.component';

describe('PieChartGraphicComponent', () => {
  let component: PieChartGraphicComponent;
  let fixture: ComponentFixture<PieChartGraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieChartGraphicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieChartGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

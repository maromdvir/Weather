import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveDaysForecastsComponent } from './five-days-forecasts.component';

describe('FiveDaysForecastsComponent', () => {
  let component: FiveDaysForecastsComponent;
  let fixture: ComponentFixture<FiveDaysForecastsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiveDaysForecastsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveDaysForecastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

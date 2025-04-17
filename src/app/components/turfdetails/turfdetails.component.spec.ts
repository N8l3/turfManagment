import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurfdetailsComponent } from './turfdetails.component';

describe('TurfdetailsComponent', () => {
  let component: TurfdetailsComponent;
  let fixture: ComponentFixture<TurfdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurfdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurfdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

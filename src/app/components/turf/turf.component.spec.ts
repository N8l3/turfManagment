import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurfComponent } from './turf.component';

describe('TurfComponent', () => {
  let component: TurfComponent;
  let fixture: ComponentFixture<TurfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

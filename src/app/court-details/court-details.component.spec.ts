import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtDetailsComponent } from './court-details.component';

describe('CourtDetailsComponent', () => {
  let component: CourtDetailsComponent;
  let fixture: ComponentFixture<CourtDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourtDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourtDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

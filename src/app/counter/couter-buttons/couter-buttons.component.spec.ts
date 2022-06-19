import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouterButtonsComponent } from './couter-buttons.component';

describe('CouterButtonsComponent', () => {
  let component: CouterButtonsComponent;
  let fixture: ComponentFixture<CouterButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouterButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CouterButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

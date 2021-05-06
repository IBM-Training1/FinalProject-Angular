import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositlandComponent } from './depositland.component';

describe('DepositlandComponent', () => {
  let component: DepositlandComponent;
  let fixture: ComponentFixture<DepositlandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositlandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositlandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

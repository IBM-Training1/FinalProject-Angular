import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawlandComponent } from './withdrawland.component';

describe('WithdrawlandComponent', () => {
  let component: WithdrawlandComponent;
  let fixture: ComponentFixture<WithdrawlandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawlandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawlandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

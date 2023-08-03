import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CretatedAlliancesComponent } from './cretated-alliances.component';

describe('CretatedAlliancesComponent', () => {
  let component: CretatedAlliancesComponent;
  let fixture: ComponentFixture<CretatedAlliancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CretatedAlliancesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CretatedAlliancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

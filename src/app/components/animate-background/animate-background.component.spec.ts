import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimateBackgroundComponent } from './animate-background.component';

describe('AnimateBackgroundComponent', () => {
  let component: AnimateBackgroundComponent;
  let fixture: ComponentFixture<AnimateBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimateBackgroundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimateBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

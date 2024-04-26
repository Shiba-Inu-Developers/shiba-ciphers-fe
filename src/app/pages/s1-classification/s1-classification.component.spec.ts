import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S1ClassificationComponent } from './s1-classification.component';

describe('S1ClassificationComponent', () => {
  let component: S1ClassificationComponent;
  let fixture: ComponentFixture<S1ClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S1ClassificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(S1ClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

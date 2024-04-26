import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S2tSegmentationComponent } from './s2t-segmentation.component';

describe('S2tSegmentationComponent', () => {
  let component: S2tSegmentationComponent;
  let fixture: ComponentFixture<S2tSegmentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S2tSegmentationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(S2tSegmentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

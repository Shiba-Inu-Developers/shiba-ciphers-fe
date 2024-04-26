import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S3kSegmentationDecryptComponent } from './s3k-segmentation-decrypt.component';

describe('S3kSegmentationDecryptComponent', () => {
  let component: S3kSegmentationDecryptComponent;
  let fixture: ComponentFixture<S3kSegmentationDecryptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S3kSegmentationDecryptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(S3kSegmentationDecryptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

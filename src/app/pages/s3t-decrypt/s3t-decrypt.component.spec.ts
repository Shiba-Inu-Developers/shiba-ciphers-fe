import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S3tDecryptComponent } from './s3t-decrypt.component';

describe('S3tDecryptComponent', () => {
  let component: S3tDecryptComponent;
  let fixture: ComponentFixture<S3tDecryptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S3tDecryptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(S3tDecryptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

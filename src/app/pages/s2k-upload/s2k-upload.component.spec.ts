import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S2kUploadComponent } from './s2k-upload.component';

describe('S2kUploadComponent', () => {
  let component: S2kUploadComponent;
  let fixture: ComponentFixture<S2kUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S2kUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(S2kUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

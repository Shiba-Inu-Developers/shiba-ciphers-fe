import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S2kDecryptComponent } from './s2k-decrypt.component';

describe('S2kDecryptComponent', () => {
  let component: S2kDecryptComponent;
  let fixture: ComponentFixture<S2kDecryptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [S2kDecryptComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(S2kDecryptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

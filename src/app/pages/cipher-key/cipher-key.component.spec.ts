import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CipherKeyComponent } from './cipher-key.component';

describe('CipherKeyComponent', () => {
  let component: CipherKeyComponent;
  let fixture: ComponentFixture<CipherKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CipherKeyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CipherKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

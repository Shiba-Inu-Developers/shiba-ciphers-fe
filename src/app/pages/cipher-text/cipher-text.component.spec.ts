import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CipherTextComponent } from './cipher-text.component';

describe('CipherTextComponent', () => {
  let component: CipherTextComponent;
  let fixture: ComponentFixture<CipherTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CipherTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CipherTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

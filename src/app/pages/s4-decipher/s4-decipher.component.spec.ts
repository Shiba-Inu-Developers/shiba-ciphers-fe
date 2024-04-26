import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S4DecipherComponent } from './s4-decipher.component';

describe('S4DecipherComponent', () => {
  let component: S4DecipherComponent;
  let fixture: ComponentFixture<S4DecipherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S4DecipherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(S4DecipherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

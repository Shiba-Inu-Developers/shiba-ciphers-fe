import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S5DecipherResultComponent } from './s5-decipher-result.component';

describe('S5DecipherResultComponent', () => {
  let component: S5DecipherResultComponent;
  let fixture: ComponentFixture<S5DecipherResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S5DecipherResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(S5DecipherResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

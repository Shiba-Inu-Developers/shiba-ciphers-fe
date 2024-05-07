import { ComponentFixture, TestBed } from '@angular/core/testing';
import {KeyStepperComponent} from "./key-stepper.component";

describe('KeyStepperComponent', () => {
  let component: KeyStepperComponent;
  let fixture: ComponentFixture<KeyStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyStepperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

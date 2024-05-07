import { ComponentFixture, TestBed } from '@angular/core/testing';
import {TextStepperComponent} from "./text-stepper.component";

describe('TextStepperComponent', () => {
  let component: TextStepperComponent;
  let fixture: ComponentFixture<TextStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextStepperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      date: ['', Validators.required],
      text: ['', Validators.required],
      number: ['', Validators.required],
    });
  }

  onFilter(): void {
    // Get the values from the form
    const dateControl = this.form.get('date');
    const textControl = this.form.get('text');
    const numberControl = this.form.get('number');

    if (dateControl && textControl && numberControl) {
      const date = dateControl.value;
      const text = textControl.value;
      const number = numberControl.value;

      // Call the service to filter the data
      // this.stepperService.filter(date, text, number).subscribe((result) => {
      //   // Update the table with the filtered data
      // });
    }
  }
}

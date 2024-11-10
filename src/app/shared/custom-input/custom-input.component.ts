import { Component, effect, input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorForm } from '../model/ErrorForm';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.css'
})
export class CustomInputComponent {

  readonly control = input.required<FormControl>();
  readonly placeholder = input<string>('');
  readonly type = input<string>('text');
  readonly label = input<string>('');
  readonly isRequired = input<boolean>(false);
  readonly maxLength = input<number>(0);
  readonly validators = input<ErrorForm[]>();
  readonly isEnable = input<boolean>(true);

  constructor() {
    effect(() => {
      if (this.isEnable()) {
        this.control().enable();
      } else {
        this.control().disable();
      }
    });
  }
}

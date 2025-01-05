import { CommonModule } from '@angular/common';
import { Component, ContentChild, effect, Input, input, signal, TemplateRef } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ErrorForm } from '../../model/ErrorForm';
import { DropDownOption } from '../../model/DropDownOption';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-options-input',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './options-input.component.html',
  styleUrl: './options-input.component.css'
})
export class OptionsInputComponent {

  readonly control = input.required<FormControl>();
  readonly label = input<string>('');
  readonly isRequired = input<boolean>(false);
  readonly validators = input<ErrorForm[]>();
  readonly isEnable = input<boolean>(true);
  readonly options = input<DropDownOption[]>([]);
  readonly itemTemplate = input<TemplateRef<any>>();



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

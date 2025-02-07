import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { constants } from '../../constants/constants';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { SimpleInputComponent } from '../../shared/custom-inputs/simple-input/simple-input.component';
import { ErrorForm } from '../../shared/model/ErrorForm';
import { AuthService } from '../services/auth.service';
import { SendForgotPassordDto } from '../model/SendForgotPassordDto';

@Component({
  selector: 'app-send-reset-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    SimpleInputComponent
  ],
  templateUrl: './send-reset-password.component.html',
  styleUrl: './send-reset-password.component.css'
})
export class SendResetPasswordComponent {

  readonly authService: AuthService = inject(AuthService);

  readonly form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(constants.PATTERN_EMAIL)])
  });

  private _isLoading = signal<boolean>(false);
  isLoading = this._isLoading.asReadonly();


  readonly validators = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Invalid email' }
    ]
  }


  sendEmail() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this._isLoading.set(true);

    const sendForgotPassordDto: SendForgotPassordDto = {
      email: this.form.value.email!
    }

    this.authService.sendResetPassword(sendForgotPassordDto).subscribe({
      next: () => {
        this._isLoading.set(false);
      },
      error: (error: ErrorForm) => {
        this._isLoading.set(false);
      }
    });
  }


}

import { Component, Signal, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { constants } from '../../constants/constants';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth.service';
import { LoginDTO } from '../model/LoginDTO';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { finalize, merge, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogService } from '../../shared/simple-dialog/services/dialog.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(constants.PATTERN_EMAIL)]),
    password: new FormControl('', [Validators.required])
  });

  private _isLoading = signal<boolean>(false);
  isLoading = this._isLoading.asReadonly();

  private _isPasswordVisible = signal<boolean>(false);
  isPasswordVisible = this._isPasswordVisible.asReadonly();

  private _errorEmail = signal<string>('');
  errorEmail = this._errorEmail.asReadonly();

  private _errorPassword = signal<string>('');
  errorPassword = this._errorPassword.asReadonly();

  private errors = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Invalid email' }
    ],
    password: [
      { type: 'required', message: 'Password is required' }
    ]
  }

  constructor(
    private authService: AuthService,
    private dialogService: DialogService
  ) {

    this.createListenerByFormControl(this.formLogin.controls.email, () => {
      this.validateControl(this.formLogin.controls.email, this.errors.email, this._errorEmail);
    });
    this.createListenerByFormControl(this.formLogin.controls.password, () => {
      this.validateControl(this.formLogin.controls.password, this.errors.password, this._errorPassword);
    });
  }
  private validateControl(control: FormControl, errors: { type: string, message: string }[], signalError: WritableSignal<string>) {
    if (control.invalid) {
      const error = errors.find(error => control.hasError(error.type));
      if (error) {
        signalError.set(error.message);
      }
    } else {
      signalError.set('');
    }
  }

  private createListenerByFormControl(control: FormControl, updateErrorMessage: () => void) {
    merge(control.statusChanges, control.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => updateErrorMessage());
  }

  login() {
    if (this.formLogin.valid) {
      const loginDTO = this.generateLoginForm();
      this.loginWithCredential(loginDTO)
    } else {
      console.log('Formulário inválido');
    }
  }

  private loginWithCredential(loginDTO: LoginDTO) {
    this._isLoading.set(true);
    this.formLogin.disable();
    this.authService.login(loginDTO)
      .subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: this.validateErrors.bind(this),
      })
      .add(() => {
        this._isLoading.set(false);
        this.formLogin.enable();
      });
  }

  private generateLoginForm(): LoginDTO {
    const email = this.formLogin.controls.email.value!;
    const password = this.formLogin.controls.password.value!;

    return {
      email: email,
      password: password
    };
  }

  private validateErrors(error: any) {
    console.log('error', error);
    if (error.status === 404) {
      this.dialogService.openDialog({
        title: 'Error',
        message: 'User not found',
        confirmButton: 'Ok'
      });
    }

    if (error.status === 401) {
      this.dialogService.openDialog({
        title: 'Error',
        message: 'Invalid credentials',
        confirmButton: 'Ok'
      });
    }

    if (error.status === 500) {
      this.dialogService.openDialog({
        title: 'Error',
        message: 'Internal server error',
        confirmButton: 'Ok'
      });
    }
  }

  togglePassword(event: MouseEvent) {
    this._isPasswordVisible.update(value => !value);
    console.log('togglePassword', this.isPasswordVisible());
    event.stopPropagation();
  }


}



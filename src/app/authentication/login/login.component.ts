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
import { ErrorForm } from '../../shared/model/ErrorForm';
import { Router } from '@angular/router';

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
    private dialogService: DialogService,
    private router: Router
  ) {

    this.createListenerByFormControl(this.formLogin.controls.email, () => {
      this.validateFormControl(this.formLogin.controls.email, this.errors.email, this._errorEmail);
    });
    this.createListenerByFormControl(this.formLogin.controls.password, () => {
      this.validateFormControl(this.formLogin.controls.password, this.errors.password, this._errorPassword);
    });
  }
  private validateFormControl(control: FormControl, errors: ErrorForm[], signalError: WritableSignal<string>) {
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
    this.formLogin.markAllAsTouched();
    if (this.formLogin.valid) {
      const loginDTO = this.generateLoginForm();
      this.loginWithCredential(loginDTO)
    } else {
      this.dialogService.showErrorMessage('Verifique sus datos');
    }
  }

  private loginWithCredential(loginDTO: LoginDTO) {
    this._isLoading.set(true);
    this.formLogin.disable();
    this.authService.login(loginDTO)
      .subscribe({
        next: () => this.router.navigate(['/drivers']),
        error: (error) => this.validateErrors(error)
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
      this.dialogService.showErrorMessage('Usuario no encontrado');
    }

    if (error.status === 401) {
      this.dialogService.showErrorMessage('Verifique sus credenciales');
    }

    if (error.status === 500) {
      this.dialogService.showErrorMessage('Error en el servidor');
    }
  }

  togglePassword(event: MouseEvent) {
    event.preventDefault();
    this._isPasswordVisible.update(value => !value);
    console.log('togglePassword', this.isPasswordVisible());
  }


}



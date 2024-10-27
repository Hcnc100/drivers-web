import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly authService: AuthService = inject(AuthService);
  private readonly dialogService: DialogService = inject(DialogService);
  private readonly router: Router = inject(Router);

  readonly formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(constants.PATTERN_EMAIL)]),
    password: new FormControl('', [Validators.required])
  });

  private _isLoading = signal<boolean>(false);
  isLoading = this._isLoading.asReadonly();

  private _isPasswordVisible = signal<boolean>(false);
  isPasswordVisible = this._isPasswordVisible.asReadonly();


  readonly validators = {
    email: [
      { type: 'required', message: 'El email es requerido' },
      { type: 'pattern', message: 'El email no es válido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es requerida' }
    ]
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
    if (error.status === 404) {
      this.dialogService.showErrorMessage('Usuario no encontrado');
      return;
    }

    if (error.status === 401) {
      this.dialogService.showErrorMessage('Verifique sus credenciales');
      return;
    }

    this.dialogService.showErrorMessage('Error en el login, intente nuevamente');
  }

  togglePassword(event: MouseEvent) {
    event.preventDefault();
    this._isPasswordVisible.update(value => !value);
    console.log('togglePassword', this.isPasswordVisible());
  }


}



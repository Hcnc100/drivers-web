import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SimpleInputComponent } from "../../shared/custom-inputs/simple-input/simple-input.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { ErrorForm } from '../../shared/model/ErrorForm';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ResetPasswordDTO } from '../model/ResetPasswordDTO';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    SimpleInputComponent,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit, OnDestroy {


  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);


  private subscription?: Subscription;

  readonly validators = {
    password: [
      {
        type: 'required',
        message: 'La contraseña es requerida'
      },
      {
        type: 'minlength',
        message: 'La contraseña debe tener al menos 6 caracteres'
      },
      {
        type: 'different',
        message: 'Las contraseñas no coinciden'
      }

    ]
  }


  readonly form = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  private _isLoading = signal<boolean>(false);
  isLoading = this._isLoading.asReadonly();

  private _isPasswordVisible1 = signal<boolean>(false);
  isPasswordVisible1 = this._isPasswordVisible1.asReadonly();

  private _isPasswordVisible2 = signal<boolean>(false);
  isPasswordVisible2 = this._isPasswordVisible2.asReadonly();

  private token = signal<string>('');


  ngOnInit(): void {
    this.subscription =
      this.activatedRoute.queryParams.subscribe(params => {
        const token = params['token'];
        this.token.set(token);
      });
  }



  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    const password = this.form.controls.password.value;
    const confirmPassword = this.form.controls.confirmPassword.value;

    if (password !== confirmPassword) {
      this.form.controls.confirmPassword.setErrors({ different: true });
      return;
    }

    this.resetPassword(password!);
  }

  private createResetPasswordDTO(password: string): ResetPasswordDTO {
    return {
      token: this.token(),
      password
    };
  }

  resetPassword(password: string) {
    this._isLoading.set(true);
    this.form.disable();
    const resetPasswordDTO = this.createResetPasswordDTO(password);
    this.authService.resetPassword(resetPasswordDTO)
      .subscribe({
        next: () => {
          this._isLoading.set(false);
          this.form.enable();
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this._isLoading.set(false);
          this.form.enable();
        }
      });
  }

  togglePassword1(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this._isPasswordVisible1.set(!this._isPasswordVisible1());

  }

  togglePassword2(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this._isPasswordVisible2.set(!this._isPasswordVisible2());
  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }


}

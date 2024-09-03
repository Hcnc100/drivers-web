import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { constants } from '../../constants/constants';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth.service';
import { LoginDTO } from '../model/LoginDTO';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(constants.PATTERN_EMAIL)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private authService: AuthService
  ) { }

  login() {
    if (this.formLogin.valid) {
      const loginDTO = this.generateLoginForm();
      this.authService.login(loginDTO).subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    } else {
      console.log('Formulário inválido');
    }
  }

  private generateLoginForm(): LoginDTO {
    const email = this.formLogin?.get('email')?.value!;
    const password = this.formLogin.get('password')?.value!;

    return {
      email: email,
      password: password
    };
  }
}

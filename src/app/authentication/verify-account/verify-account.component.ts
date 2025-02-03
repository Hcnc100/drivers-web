import { Component, inject, OnInit, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { VerifyAccountState } from '../model/VerifyAccount.state';

@Component({
  selector: 'app-verify-account',
  standalone: true,
  imports: [
    MatProgressSpinnerModule
  ],
  templateUrl: './verify-account.component.html',
  styleUrl: './verify-account.component.css'
})
export class VerifyAccountComponent implements OnInit {

  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly authService: AuthService = inject(AuthService);

  readonly verifyAccountState = signal<VerifyAccountState>(VerifyAccountState.LOADING);
  readonly VerifyAccountStateEnum = VerifyAccountState;


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.verifyAccount(token);
      }
    });
  }


  private verifyAccount(token: string): void {
    this.authService.verifyAccount(token).subscribe({
      next: (res) => {
        console.log(res);
        this.verifyAccountState.set(VerifyAccountState.VERIFIED);
      },
      error: (err) => {
        console.error(err);
        this.verifyAccountState.set(VerifyAccountState.NOT_VERIFIED);
      }
    });
  }
}

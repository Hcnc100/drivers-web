import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { VerifyAccountState } from '../model/VerifyAccount.state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-verify-account',
  standalone: true,
  imports: [
    MatProgressSpinnerModule
  ],
  templateUrl: './verify-account.component.html',
  styleUrl: './verify-account.component.css'
})
export class VerifyAccountComponent implements OnInit, OnDestroy {


  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly authService: AuthService = inject(AuthService);

  readonly verifyAccountState = signal<VerifyAccountState>(VerifyAccountState.LOADING);
  readonly VerifyAccountStateEnum = VerifyAccountState;

  private subscription?: Subscription;


  ngOnInit(): void {
    this.subscription =
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
        this.verifyAccountState.set(VerifyAccountState.VERIFIED);
      },
      error: (err) => {
        this.verifyAccountState.set(VerifyAccountState.NOT_VERIFIED);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

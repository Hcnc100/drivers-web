import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private readonly toastr: ToastrService = inject(ToastrService);

  showSuccess(message: string, title: string) {
    this.toastr.success(message, title);
  }


  showError(message: string, title: string) {
    this.toastr.error(message, title);
  }

}

import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterUtilService {

  constructor(
    private toastr: ToastrService,
  ) { }
  showSuccess(message: any, title: any) {
    this.clearToastrMessage()
    this.toastr.success(message, title);
  }

  showError(message: any, title: any) {
    this.clearToastrMessage();
    this.toastr.error(message, title);
  }
  clearToastrMessage() {
    this.toastr.clear();
  }
}

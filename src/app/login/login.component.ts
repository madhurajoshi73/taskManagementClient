import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { ToasterUtilService } from '../services/toasteUtilr.service';

import { ROLE, ROLEWISE_ROUTE_URL } from '../constants/CONSTANTS';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(3)]),
    password: new FormControl("",[Validators.required, Validators.minLength(8)])
  });
  isLoggedIn:boolean = false;
  submitted: boolean = false;
  currentUser: any;

  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject(StorageService) private storageService: StorageService,
    private toastrUtilService: ToasterUtilService,
    private router: Router,

  ) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.submitted=true
    if(this.loginForm.valid && this.loginForm.controls.username && this.loginForm.controls.password){
      const  username  = this.loginForm.controls.username.value?.toString()??"";
      const  password  = this.loginForm.controls.password.value?.toString()??"";


      this.authService.login(username, password).subscribe({next: data=>{
        this.storageService.saveUser(data);
        this.currentUser = this.storageService.getUser();
        this.redirectingLoggedInUserToDashboard(this.currentUser.role);
        this.isLoggedIn = true;
      },
      error: err=>{
          this.toastrUtilService.showError("",err?.error?.error)
      }
    })
    }
  }
  redirectingLoggedInUserToDashboard(role: any) {
    if (ROLE.ADMIN == role) {
      this.router.navigate([ROLEWISE_ROUTE_URL.ADMIN]);
    } else if (ROLE.HR == role) {
      this.router.navigate([ROLEWISE_ROUTE_URL.HR]);
    } else if (ROLE.EMPLOYEE == role) {
      this.router.navigate([ROLEWISE_ROUTE_URL.EMPLOYEE]);
    }
  }
}

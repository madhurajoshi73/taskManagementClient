import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { ToasterUtilService } from '../services/toasteUtilr.service';
import {ROLE} from '../constants/CONSTANTS'
import { Router } from '@angular/router';
import { StrongPasswordRegx } from '../constants/CONSTANTS';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(3)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("",[Validators.required, Validators.pattern(StrongPasswordRegx)]),
    userrole: new FormControl("",[Validators.required]),

  });
  isLoggedIn:boolean = false;
  submitted: boolean = false;
  ROLE = ROLE;
  taskData: any;
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
      const  role  = this.loginForm.controls.userrole.value?.toString()??"";
      const  email  = this.loginForm.controls.email.value?.toString()??"";

      this.authService.register(email,username, password, role).subscribe({next: data=>{
        this.storageService.saveUser(data);
        this.isLoggedIn = true;
        this.toastrUtilService.showSuccess("","Registered successfully")
        this.router.navigate(['/login'])
      },
      error: err=>{
          this.toastrUtilService.showError("",err.error.error)
      }
    })
    }
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../services/storage.service';
import { ToasterUtilService } from '../services/toasteUtilr.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {StrongPasswordRegx} from '../constants/CONSTANTS'
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  currentUser: any;
  editForm = new FormGroup({
    pass1: new FormControl("",[Validators.required, Validators.minLength(8), Validators.pattern(StrongPasswordRegx)]),
    pass2: new FormControl("",[Validators.required, Validators.minLength(8), Validators.pattern(StrongPasswordRegx)]),
  })
  editSubmitted: boolean=false;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    @Inject(AuthService) private authService: AuthService,
    @Inject(StorageService) private storageService: StorageService,
    @Inject(ToasterUtilService) private toastrUtilService: ToasterUtilService,
  ) { }

  ngOnInit(): void {
      this.currentUser = this.storageService.getUser();
      this.getUser()
  }
  getUser(){
    const data={
      id: this.currentUser.id
    }
    this.authService.getUser(data).subscribe({next: useradd=>{
      this.currentUser = this.storageService.getUser();
        this.currentUser.email = useradd.body.user.email;
    },
    error: err=>{
        // this.storageService.clean()
        this.currentUser={}
        this.toastrUtilService.showError("",err?.error?.error)
    }
    })
  }
  logout(){
    this.storageService.clean();
    this.router.navigate(['/login']);
  }
//task navigate
  gottotask(){
    this.router.navigate(['/task'])
  }
  onSubmit(){
    this.editSubmitted=true
    if(this.editForm.valid && this.editForm.controls.pass1 && this.editForm.controls.pass2){
      const  pass1  = this.editForm.controls.pass1.value?.toString()??"";
      const  pass2  = this.editForm.controls.pass2.value?.toString()??"";
      if(pass1===pass2){
        let data = {
          password: pass1
        }
      this.authService.resetPass(data).subscribe({next: data=>{
        this.editSubmitted=false;
        this.editForm.reset()
        this.modalService.dismissAll()
        this.toastrUtilService.showSuccess("","Changed successfully")
      },
      error: err=>{
          this.toastrUtilService.showError("","failed")
      }
    })
  }
    }
  }
  closeModalFunction(content:any){
    content.reset()
    this.modalService.dismissAll();
  }
  openModalFunction(content:any){
    this.modalService.open(content);
  }
}

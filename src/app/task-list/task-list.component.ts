import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToasterUtilService } from '../services/toasteUtilr.service';
import { TASK_STATUS,TASK_PRIO } from '../constants/CONSTANTS';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  taskList: any=[];
  minDate = new Date().toISOString().split('T')[0]
  addForm = new FormGroup({
    title: new FormControl("", [Validators.required, Validators.minLength(5)]),
    text: new FormControl("", [Validators.required, Validators.minLength(5)]),
    date: new FormControl("",[Validators.required]),
    priority: new FormControl("", [Validators.required])
  })
  editForm = new FormGroup({
    id: new FormControl("",[Validators.required]),
    title: new FormControl("", [Validators.required, Validators.minLength(5)]),
    text: new FormControl("", [Validators.required, Validators.minLength(5)]),
    status: new FormControl("", [Validators.required]),
    priority: new FormControl("", [Validators.required])
  })
  addSubmitted: boolean =false;
  editSubmitted: boolean=false;
  modalReference: NgbModalRef | undefined;
  filter: any="all";
  currentUser: any;
  viewTask: any;
  TASK_STATUS = TASK_STATUS;
  TASK_PRIO = TASK_PRIO;
  prio: any = "all";

  constructor(
    private modalService: NgbModal,
    private router: Router,
    @Inject(AuthService) private authService: AuthService,
    @Inject(StorageService) private storageService: StorageService,
    @Inject(ToasterUtilService) private toastrUtilService: ToasterUtilService,
  ) { }

  ngOnInit(): void {
    this.getAllTask()
    this.currentUser = this.storageService.getUser()
  }

openModalFunction(content:any){
  this.modalReference = this.modalService.open(content);
}

openEditModalFunction(content:any,task:any){
  this.editForm.controls['id'].setValue(task.id);
  this.editForm.controls['title'].setValue(task.title);
  this.editForm.controls['text'].setValue(task.description);
  this.editForm.controls['status'].setValue(task.status);
  this.editForm.controls['priority'].setValue(task.priority)
  this.modalReference = this.modalService.open(content);
}

openViewModalFunction(content:any,task:any){
  this.viewTask = task
  this.modalReference = this.modalService.open(content);
}

closeModalFunction(content:any|null){
  if(content){
    content.reset()
  }
  this.modalService.dismissAll();
}

addTask() {
  this.addSubmitted = true
  if(!this.addForm.invalid)
    {
      const data = {
        title: this.addForm.controls.title.value,
        text: this.addForm.controls.text.value,
        date: this.addForm.controls.date.value,
        priority: this.addForm.controls.priority.value
    }
    this.authService.addTask(data).subscribe({next: (res: any)=>{
      this.modalService.dismissAll();
      this.addForm.reset();
      this.filter='all'
      this.prio='all'
      this.getAllTask();
      this.toastrUtilService.showSuccess("","Add Successfully")
    },
    error: err=>{
        this.modalService.dismissAll();
        this.toastrUtilService.showError("",err?.error?.error)
    }
  })
    }
}

getAllTask(){
  this.authService.getTask().subscribe({next: data=>{
    this.taskList = data.body;
  },
  error: err=>{
      this.toastrUtilService.showError("","Data fetching error")
  }
})
}

updateTask(){
  this.editSubmitted = true
  if(!this.editForm.invalid)
    {
  const data = {
      id: this.editForm.controls.id.value,
      title: this.editForm.controls.title.value,
      text: this.editForm.controls.text.value,
      status: this.editForm.controls.status.value,
      priority: this.editForm.controls.priority.value
  };
  this.authService.editTask(data).subscribe({next: (res: any)=>{
    this.modalService.dismissAll();
    this.getAllTask();
    this.toastrUtilService.showSuccess("","Edited Successfully")
  },
  error: err=>{
        this.modalService.dismissAll();
      this.toastrUtilService.showError("",err?.error?.error)
  }
})
  }
}

filterTask(key:any){
  if(this.filter=='all' && this.prio=='all'){
    this.getAllTask()
  }
  else{
    this.getFilteredTask(this.filter, this.prio)
  }
}

getFilteredTask(status: any, prio: any){
  let data ={
    status: status,
    priority: prio
  }
  this.authService.getFilterTask(data).subscribe({next: data=>{
    this.taskList = data.body;
  },
  error: err=>{
      this.toastrUtilService.showError("","Data fetching error")
  }
})
}
logout(){
  this.storageService.clean();
  this.router.navigate(['/login']);
}
deleteTask(task: any) {
  const data = {
      id: task.id
  };
  this.authService.delTask(data).subscribe({next: (res: any)=>{
    this.getAllTask();
    this.toastrUtilService.showSuccess("","Deleted Successfully")
  },
  error: err=>{
      this.modalService.dismissAll();
      this.toastrUtilService.showError("",err?.error?.error)
  }
})
}
//edit profile navigate
editProfile(){
  this.router.navigate(['/profile'])
}
}

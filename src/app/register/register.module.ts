import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RouterModule, Routes } from '@angular/router';
import {  ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
      path: '',
      component: RegisterComponent,
      pathMatch: 'full'
  },
];
@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  exports:[
    RegisterComponent
  ]
})
export class RegisterModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
import { ROLE } from './constants/CONSTANTS';
const routes: Routes = [
    {
      path: 'login',
      loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
      title: 'Login',
      // canActivate: [AuthGuard]
    },
    {
      path: 'register',
      loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
      title: 'Register',
      // canActivate: [AuthGuard]
    },
    {
      path: 'task',
      loadChildren: () => import('./task-list/task-list.module').then(m => m.TaskListModule),
      title: 'Task Management',
      canActivate: [AuthGuard],
      data: {
        requiredRoles: [ROLE.ADMIN,ROLE.HR,ROLE.EMPLOYEE],
      },
    },
    {
      path: 'profile',
      loadChildren: () => import('./edit-profile/edit-profile.module').then(m => m.EditProfileModule),
      title: 'Profile',
      canActivate: [AuthGuard],
      data: {
        requiredRoles: [ROLE.ADMIN,ROLE.HR,ROLE.EMPLOYEE],
      },
    },
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

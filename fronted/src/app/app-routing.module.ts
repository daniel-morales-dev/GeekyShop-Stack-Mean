import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//COMPONENTES//
import {EmployeesComponent} from './components/employees/employees.component';
import {GamesComponent} from './components/games/games.component';
import {SigninComponent} from './components/signin/signin.component';
import {SignupComponent} from './components/signup/signup.component';
import {ProfileComponent} from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { ConsolasComponent } from './components/consolas/consolas.component';
import { PrivateGamesComponent } from './components/private-games/private-games.component';
import {UsersComponent} from './components/users/users.component';
import {AuthRoleAdminGuard} from "./guards/auth-role-admin.guard"
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [AuthGuard,AuthRoleAdminGuard]
  },
  {
    path: 'games',
    component: GamesComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path:'consolas',
    component: ConsolasComponent
  },
  {
    path:'private-games',
    component: PrivateGamesComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'users',
    component: UsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
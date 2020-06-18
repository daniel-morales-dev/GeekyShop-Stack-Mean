import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//COMPONENTES//
import { EmployeesComponent } from './components/employees/employees.component';
import { GamesComponent } from './components/games/games.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { PrivateGamesComponent } from './components/private-games/private-games.component';
import { UsersComponent } from './components/users/users.component';
import { AuthRoleAdminGuard } from './guards/auth-role-admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { AuthBackToLoginGuard } from './guards/auth-back-to-login.guard';
import { GestionProductsComponent } from './components/gestionProductos/gestion-products.component';
import { PreviewProductsComponent } from './components/preview-products/preview-products.component';
import { AuthRoleEmployeeGuard } from './guards/auth-role-employee.guard';
import { Page404Component } from './components/public/page404/page404.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [AuthGuard, AuthRoleAdminGuard],
  },
  {
    path: 'gestionProducts',
    component: GestionProductsComponent,
    canActivate: [AuthGuard, AuthRoleEmployeeGuard],
  },
  {
    path: 'games',
    component: GamesComponent,
  },
  {
    path: 'preview-products/:id',
    component: PreviewProductsComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [AuthBackToLoginGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [AuthBackToLoginGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'private-games',
    component: PrivateGamesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'checkout/:id',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**', //Si no encuentra una pagina, muestra la 404
    component: Page404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

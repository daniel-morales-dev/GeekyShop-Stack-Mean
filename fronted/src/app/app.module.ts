import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { GamesComponent } from './components/games/games.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { ConsolasComponent } from './components/consolas/consolas.component';
import { PrivateGamesComponent } from './components/private-games/private-games.component';
import { UsersComponent } from './components/users/users.component';

import { AuthGuard } from './guards/auth.guard';
import { AuthBackToLoginGuard } from './guards/auth-back-to-login.guard';
import { AuthRoleAdminGuard } from './guards/auth-role-admin.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { GestionProductsComponent } from './components/gestionProductos/gestion-products.component';
import { PreviewProductsComponent } from './components/preview-products/preview-products.component';
import { ShopcartComponent } from './components/shopcart/shopcart.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    SignupComponent,
    SigninComponent,
    GamesComponent,
    ProfileComponent,
    HomeComponent,
    ConsolasComponent,
    PrivateGamesComponent,
    UsersComponent,
    GestionProductsComponent,
    PreviewProductsComponent,
    ShopcartComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
    AuthRoleAdminGuard,
    AuthBackToLoginGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

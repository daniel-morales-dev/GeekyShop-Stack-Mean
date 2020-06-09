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
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/home/cart/cart.component';
import { FilterComponent } from './components/home/filter/filter.component';
import { CartItemComponent } from './components/home/cart/cart-item/cart-item.component';
import { ProductListComponent } from './components/home/product-list/product-list.component';
import { ProductItemComponent } from './components/home/product-list/product-item/product-item.component';
import { Page404Component } from './components/public/page404/page404.component';

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
    FooterComponent,
    CartComponent,
    FilterComponent,
    CartItemComponent,
    ProductListComponent,
    ProductItemComponent,
    Page404Component,
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

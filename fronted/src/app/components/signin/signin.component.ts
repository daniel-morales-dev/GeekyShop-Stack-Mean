import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  user = { email: '', password: '' };
  emailPattern =
    "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$";
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  signIn() {
    this.authService.signIn(this.user).subscribe(
      (res) => {
        this.authService.setToken(res.token);
        this.authService.decodeToken(); //USO EL DECODE TOKEN
        AppComponent.updateUserStatus.next(true);
        this.router.navigate(['/home']);
        Swal.fire({
          icon: 'success',
          title: 'Bienvenido ' + res.datos.nombre_usuario,
          text: 'Tu Rol es: ' + res.datos.rol,
          confirmButtonColor: '#6c5ce7',
        });
      },
      (err) => {
        switch (err.error.code_error) {
          case 'account_noexists':
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Esta cuenta no existe, registrate primero',
              confirmButtonColor: '#6c5ce7',
            });
            this.router.navigate(['/signup']);
            break;
          case 'password_wrong':
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Contraseña incorrecta, intentelo de nuevo',
              confirmButtonColor: '#6c5ce7',
            });
            break;
          default:
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error en el inicio de sesion, intentelo de nuevo',
              confirmButtonColor: '#6c5ce7',
            });
            break;
        }
      }
    );
  }
}

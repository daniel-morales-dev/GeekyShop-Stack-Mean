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
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}



  signIn() {
    this.authService.signIn(this.user).subscribe(
      (res) => {
        this.authService.setToken(res.token);
        this.authService.decodeToken(); //USO EL DECODE TOKEN 
        AppComponent.updateUserStatus.next(true);
        this.router.navigate(['/home']);
        Swal.fire(
          'Bienvenido ' + res.datos.nombre_usuario,
          'Tu Rol es: ' + res.datos.rol,
          'success'
        );
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text:
            'No se ha podido iniciar sesion, verifique su correo y contraseña',
        });
      }
    );
  }
}

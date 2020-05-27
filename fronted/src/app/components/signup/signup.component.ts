import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user = { name: '', email: '', password: '' };
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  signUp(form: NgForm) {
    this.authService.signUp(this.user).subscribe(
      (res) => {
        this.authService.setToken(res.token);
        this.authService.decodeToken();
        AppComponent.updateUserStatus.next(true);
        this.router.navigate(['/home']);
        Swal.fire(
          'Registro Exitoso ' + res.datos.nombre_usuario,
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

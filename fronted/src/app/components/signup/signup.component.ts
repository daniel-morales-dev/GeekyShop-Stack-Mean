import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user = { name: '', email: '', password: '' };
  registerForm: FormGroup;
  emailPattern =
    "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$";
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit() {}

  signUp() {
    this.authService.signUp(this.registerForm.value).subscribe(
      (res) => {
        this.authService.setToken(res.token);
        this.authService.decodeToken();
        AppComponent.updateUserStatus.next(true);
        this.router.navigate(['/home']);
        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso ' + res.datos.nombre_usuario,
          text: 'Tu Rol es: ' + res.datos.rol,
          confirmButtonColor: '#6c5ce7',
        });
      },
      (err) => {
        switch (err.error.code_error) {
          case 'password_invalid':
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text:
                'Contraseña invalida, por favor, ingrese mas de 4 caracteres',
            });
            break;
          case 'email_existent':
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ese correo ya esta registrado, ingresa uno nuevo',
              confirmButtonColor: '#6c5ce7',
            });
            break;
          case 'email_invalid':
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Este email es invalido, por favor ingrese otro',
            });
            break;
          default:
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text:
                'Hubo un error en el registro, ingresa de nuevo tus credenciales',
            });
            break;
        }
      }
    );
  }
}

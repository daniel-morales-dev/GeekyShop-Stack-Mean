import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  profileForm: FormGroup;
  emailPattern =
    "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$";
  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    public userService: UsersService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      passwordActual: [''],
      passwordNueva: [''],
    });
  }

  ngOnInit() {
    this.traerDatos();
  }

  traerDatos() {
    const idUser = this.authService.decodeToken().id;
    this.userService.getProfile(idUser).subscribe((res) => {
      this.user = res;
      this.profileForm.controls['email'].setValue(res.email);
      this.profileForm.controls['name'].setValue(res.name);
    });
  }
  guardarCambios(id) {
    this.userService.updateProfile(id, this.profileForm.value).subscribe(
      (res) => {
        Swal.fire({
          title: 'Perfil actualizado',
          imageUrl: '../../../assets/imgs/people.svg',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
          confirmButtonColor: '#6c5ce7',
        }).then((result) => {
          if (result.value) {
            this.router
              .navigateByUrl('/RefreshComponent', {
                skipLocationChange: true,
              })
              .then(() => {
                this.router.navigate([`/profile/${id}`]);
              });
          }
        });
      },
      (err) => {
        Swal.fire({
          title: 'Parece que hubo un error actualizando tu perfil',
          text: 'Comunicate con el administrador del sistema',
          imageUrl: '../../../assets/imgs/stress.svg',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
          confirmButtonColor: '#6c5ce7',
        }).then((result) => {
          if (result.value) {
            this.router
              .navigateByUrl('/RefreshComponent', {
                skipLocationChange: true,
              })
              .then(() => {
                this.router.navigate([`/profile/${id}`]);
              });
          }
        });
      }
    );
  }
}

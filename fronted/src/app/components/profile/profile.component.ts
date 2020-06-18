import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

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
    public userService: UsersService
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      inputImage: [''],
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
      this.profileForm.controls['password'].setValue(res.password);
    });
  }
  guardarCambios(id) {
    this.userService.updateProfile(id, this.profileForm.value).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err)
    );
  }
}

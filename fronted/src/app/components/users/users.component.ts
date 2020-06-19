import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/users';
import Swal from 'sweetalert2';
import { RolesService } from 'src/app/services/roles.service';
import { ShopcartService } from 'src/app/services/shopcart.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  id: String;
  userModificador: any;
  user = { name: '', email: '', rol: '' };
  roles: any;
  onEditUser: boolean;
  createUserForm: FormGroup;
  emailPattern =
    "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$";
  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    public userService: UsersService,
    public rolService: RolesService,
    public getUserId: ShopcartService
  ) {
    this.createUserForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      rol: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.getUserModificador();
    this.getUsers();
    this.getRoles();
    this.createUserForm.controls['rol'].setValue('usuario');
    this.deshabilitarInputs();
    this.onEditUser = false;
  }

  deshabilitarInputs() {
    this.createUserForm.controls['name'].disable();
    this.createUserForm.controls['email'].disable();
    this.createUserForm.controls['rol'].disable();
  }

  habilitarInputs() {
    this.createUserForm.controls['name'].enable();
    this.createUserForm.controls['email'].enable();
    this.createUserForm.controls['rol'].enable();
  }

  getUserModificador() {
    this.userService.getProfile(this.getUserId.getUserId()).subscribe((res) => {
      this.userModificador = res;
    });
  }
  getUsers() {
    this.userService.getUsers().subscribe((res) => {
      this.userService.users = res as User[];
    });
  }
  getRoles() {
    this.rolService.getRoles().subscribe((res) => {
      this.roles = res;
    });
  }
  resetForm(form?: FormGroup) {
    if (form) {
      form.reset();
      this.createUserForm.controls['rol'].setValue('usuario');
      this.userService.selectedUser = new User();
    }
  }

  addUser() {
    if (this.onEditUser == true) {
      this.userService
        .updateProfile(this.id, this.createUserForm.value)
        .subscribe(
          (res) => {
            this.resetForm(this.createUserForm);
            this.getUsers();
            this.deshabilitarInputs();
            Swal.fire({
              title: 'Actualizacion exitosa!',
              text: 'Empleado actualizado correctamente',
              icon: 'success',
              confirmButtonColor: '#6c5ce7',
            });
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  editUser(user) {
    this.habilitarInputs();
    this.id = user._id;
    this.userService.selectedUser = user;
    this.createUserForm.controls['name'].setValue(user.name);
    this.createUserForm.controls['email'].setValue(user.email);
    this.createUserForm.controls['rol'].setValue(user.rol);
    this.onEditUser = true;
  }

  deleteUser(_id: string) {
    console.log(this.userModificador);
    Swal.fire({
      title: '¿Estas seguro de querer eliminar este registro?',
      text: 'No podras revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6c5ce7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borralo',
    }).then((result) => {
      if (result.value) {
        this.userService.deleteUser(_id, this.userModificador).subscribe(
          (res) => {
            Swal.fire({
              title: 'Eliminado',
              text: 'Tu registro se ha eliminado con exito.',
              icon: 'success',
              confirmButtonColor: '#6c5ce7',
            });
            this.getUsers();
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Algo salio mal',
              text: 'No pudimos eliminar tu registro',
              confirmButtonColor: '#6c5ce7',
            });
          }
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Algo salio mal',
          text: 'No pudimos eliminar tu registro',
          confirmButtonColor: '#6c5ce7',
        });
      }
    });
  }
}

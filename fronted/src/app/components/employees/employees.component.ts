import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeeService],
})
export class EmployeesComponent implements OnInit {
  constructor(public employeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployees();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.resetForm()
      this.employeeService.selectedEmployee = new Employee();
    }
  }

  addEmployee(form: NgForm) {
    if (form.value._id) {
      this.employeeService.putEmployee(form.value).subscribe(
        (res) => {
          this.resetForm(form);
          this.getEmployees();
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
    } else if (!form.value._id) {
      this.employeeService.postEmployee(form.value).subscribe(
        (res) => {
          this.resetForm(form);
          this.getEmployees();
          Swal.fire({
            title: 'Registro exitoso',
            text: 'Empleado registrado exitosamente',
            icon: 'success',
            confirmButtonColor: '#6c5ce7',
          });
        },
        (err) => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo guardar el registro',
          });
        }
      );
    }
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
    });
  }

  editEmployee(employee: Employee) {
    this.employeeService.selectedEmployee = employee;
  }
  deleteEmployee(_id: string) {
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
        Swal.fire({
          title: 'Eliminado',
          text: 'Tu registro se ha eliminado con exito.',
          icon: 'success',
          confirmButtonColor: '#6c5ce7',
        });
        this.employeeService.deleteEmployee(_id).subscribe((res) => {
          this.getEmployees();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Algo salio mal',
          text: 'No pudimos eliminar tu registro',
          confirmButtonColor: "#6c5ce7", 
        });
      }
    });
  }
}

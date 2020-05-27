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
      form.reset();
      this.employeeService.selectedEmployee = new Employee();
    }
  }

  addEmployee(form: NgForm) {
    if (form.value._id) {
      this.employeeService.putEmployee(form.value).subscribe(
        (res) => {
          this.resetForm(form);
          this.getEmployees();
          Swal.fire(
            'Actualizacion exitosa!',
            'Empleado actualizado correctamente',
            'success'
          );
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
          Swal.fire(
            'Registro exitoso',
            'Empleado registrado exitosamente',
            'success'
          );
        },
        (err) => {
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
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borralo',
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Eliminado',
          'Tu registro se ha eliminado con exito.',
          'success'
        );
        this.employeeService.deleteEmployee(_id).subscribe((res) => {
          this.getEmployees();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Algo salio mal',
          text: 'No pudimos eliminar tu registro',
        });
      }
    });
  }
}

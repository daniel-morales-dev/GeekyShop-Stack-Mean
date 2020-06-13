import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../services/employee.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/employee';

import Swal from 'sweetalert2';
import { on } from 'process';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeeService],
})
export class EmployeesComponent implements OnInit {
  id: String;
  employee = { name: '', position: '', officine: '', salary: 0 };
  onEditEmployee: boolean;
  createEmployeeForm: FormGroup;
  salaryPattern = /[0-9]/;
  constructor(public employeeService: EmployeeService, public fb: FormBuilder) {
    this.createEmployeeForm = this.fb.group({
      name: ['', [Validators.required]],
      position: ['', [Validators.required]],
      officine: ['', [Validators.required]],
      salary: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(7),
          Validators.pattern(this.salaryPattern),
        ],
      ],
    });
  }

  ngOnInit() {
    this.getEmployees();
    this.onEditEmployee = false;
  }

  resetForm(form?: FormGroup) {
    if (form) {
      form.reset();
      this.employeeService.selectedEmployee = new Employee();
    }
  }

  onSalaryIntroduced(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.charCode);
    if (!this.salaryPattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  addEmployee() {
    if (this.onEditEmployee == false) {
      this.employeeService
        .postEmployee(this.createEmployeeForm.value)
        .subscribe(
          (res) => {
            this.resetForm(this.createEmployeeForm);
            this.getEmployees();
            Swal.fire({
              title: 'Registro exitoso',
              text: 'Empleado registrado exitosamente',
              icon: 'success',
              confirmButtonColor: '#6c5ce7',
            });
          },
          (err) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se pudo guardar el registro',
            });
          }
        );
    } else if (this.onEditEmployee == true) {
      console.log('Trato de editar');
      console.log();
      this.employeeService
        .putEmployee(this.id, this.createEmployeeForm.value)
        .subscribe(
          (res) => {
            this.resetForm(this.createEmployeeForm);
            this.resetForm(this.createEmployeeForm);
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
    }
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
    });
  }

  editEmployee(employee) {
    this.id = employee._id;
    this.employeeService.selectedEmployee = employee;
    this.createEmployeeForm.controls['name'].setValue(employee.name);
    this.createEmployeeForm.controls['officine'].setValue(employee.officine);
    this.createEmployeeForm.controls['position'].setValue(employee.position);
    this.createEmployeeForm.controls['salary'].setValue(employee.salary);
    this.onEditEmployee = true;
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
          confirmButtonColor: '#6c5ce7',
        });
      }
    });
  }
}

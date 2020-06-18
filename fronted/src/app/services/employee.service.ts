import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  selectedEmployee: Employee;
  employees: Employee[];
  readonly URL_API = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {
    this.selectedEmployee = new Employee();
  }

  postEmployee(Employee) {
    return this.http
      .post<Employee>(this.URL_API, Employee)
      .pipe(map((res) => res));
  }

  getEmployees() {
    return this.http.get(this.URL_API);
  }

  putEmployee(id: String, Employee) {
    return this.http
      .put<Employee>(this.URL_API + `/${id}`, Employee)
      .pipe(map((res) => res));
  }

  deleteEmployee(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}

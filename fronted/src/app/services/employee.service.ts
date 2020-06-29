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
  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    this.selectedEmployee = new Employee();
  }

  postEmployee(Employee) {
    return this.http
      .post<Employee>(this.URL + '/employees', Employee)
      .pipe(map((res) => res));
  }

  getEmployees() {
    return this.http.get(this.URL + '/employees');
  }

  putEmployee(id: String, Employee) {
    return this.http
      .put<Employee>(this.URL + '/employees' + `/${id}`, Employee)
      .pipe(map((res) => res));
  }

  deleteEmployee(_id: string) {
    return this.http.delete(this.URL + '/employees' + `/${_id}`);
  }
}

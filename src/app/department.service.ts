import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private departmentApiUrl = 'http://192.168.1.41:9096/api/v0/get_departments_byofficeid';
  private employeeApiUrl = 'http://192.168.1.41:9096/api/v0/get_employees_list';

  constructor(private http: HttpClient) {}

  getDepartmentsByOfficeId(officeId: number): Observable<any> {
    return this.http.get<any>(`${this.departmentApiUrl}?officeid=${officeId}`);
  }

  getEmployeesList(): Observable<any[]> {
    return this.http.get<any[]>(this.employeeApiUrl);
  }
} 
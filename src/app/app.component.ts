import { Component, OnInit } from '@angular/core';
import { DepartmentService } from './department.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  department: string = ''; // Selected department name
  departmentId: number | null = null; // Selected department ID
  date: string = ''; // Selected date
  departmentNames: any[] = []; // Departments list
  officeId: number = 1; // Hardcoded office ID
  employees: any[] = []; // All employees list
  filteredEmployees: any[] = []; // Filtered employees list

  constructor(private departmentService: DepartmentService) {}

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchDepartments() {
    this.departmentService.getDepartmentsByOfficeId(this.officeId).subscribe(
      (response) => {
        console.log('Department API Response:', response);

        if (Array.isArray(response)) {
          this.departmentNames = response;
        } else if (response && response.departments) {
          this.departmentNames = response.departments;
        } else {
          this.departmentNames = [];
        }
      },
      (error) => {
        console.error('Error fetching departments:', error);
        this.departmentNames = [];
      }
    );
  }

  fetchEmployees() {
    this.departmentService.getEmployeesList().subscribe(
      (response) => {
        console.log('Employees List:', response);
        this.employees = response.map((emp) => ({
          name: emp.empname,
          code: emp.empcode,
          department: emp.department_name,
          dept_id: emp.dept_id, // Store department ID for filtering
        }));
        this.filteredEmployees = [...this.employees]; // Initially show all employees
      },
      (error) => {
        console.error('Error fetching employees:', error);
        this.employees = [];
        this.filteredEmployees = [];
      }
    );
  }

  onDepartmentChange() {
    // Get department ID based on selected department name
    const selectedDept = this.departmentNames.find(
      (dept) => dept.dept_name === this.department
    );
    this.departmentId = selectedDept ? selectedDept.dept_id : null;

    // Filter employees based on department ID
    if (this.departmentId !== null) {
      this.filteredEmployees = this.employees.filter(
        (emp) => emp.dept_id === this.departmentId
      );
    } else {
      this.filteredEmployees = [...this.employees]; 
    }
  }

  submit() {
    alert(`Department: ${this.department}\nDate: ${this.date}`);
  }
}

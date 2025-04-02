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
        this.departmentNames = Array.isArray(response)
          ? response
          : response?.departments || [];
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
    const selectedDept = this.departmentNames.find(
      (dept) => dept.dept_name === this.department
    );
    this.departmentId = selectedDept ? selectedDept.dept_id : null;

    this.filteredEmployees = this.departmentId
      ? this.employees.filter((emp) => emp.dept_id === this.departmentId)
      : [...this.employees];
  }

  submit() {
    if (!this.date || !this.department) {
      alert('Please select both Department and Date');
      return;
    }

    const payload = {
      dt_from: this.date,
      dt_to: this.date,
      emp_id: 2,
      office_id: 1,
      type_id: '0',
    };

    this.departmentService.getDailyAttendanceList(payload).subscribe(
      (response) => {
        console.log('Attendance API Response:', response);
        this.filteredEmployees = response.map((emp) => ({
          name: emp.emp_name,
          code: emp.empcode,
          department: emp.dept_name,
        }));
      },
      (error) => {
        console.error('Error fetching attendance data:', error);
        this.filteredEmployees = [];
      }
    );
  }
}

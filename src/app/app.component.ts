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
  tableVisible: boolean = false; // Control table visibility

  constructor(private departmentService: DepartmentService) {}

  ngOnInit() {
    // Commented out the API call and using hardcoded data instead
    // this.fetchEmployees();
    this.initializeHardcodedData();
  }

  initializeHardcodedData() {
    // Hardcoded departments
    this.departmentNames = [
      { dept_id: 1, dept_name: 'SOFTWARE DIVISION' },
      { dept_id: 2, dept_name: 'HARDWARE DIVISION' },
      { dept_id: 3, dept_name: 'IT CONSULTANCY DIVISION'	
      }
    ];

    // Hardcoded employees (selected fields only)
    this.employees = [
      { name: 'AIBY MOHANDAS', code: 'E001', department: 'SOFTWARE DIVISION', dept_id: 1 },
      { name: 'RAGI K MATHAI', code: 'E002', department: 'IT CONSULTANCY DIVISION', dept_id: 3 },
      { name: 'SREEJA C', code: 'E003', department: 'SOFTWARE DIVISION', dept_id: 1 },
      { name: 'ARCHA SS', code: 'E004', department: 'SOFTWARE DIVISION', dept_id: 1 },
      { name: 'ABHIJITH A', code: 'E009', department: 'SOFTWARE DIVISION', dept_id: 1 },
      { name: 'ARJUN', code: 'E008', department: 'SOFTWARE DIVISION', dept_id: 1 },
      { name: 'SREEHARI S S', code: 'E101', department: 'SOFTWARE DIVISION', dept_id: 1 }
    ];
    
    this.filteredEmployees = [...this.employees];
  }

  fetchDepartments() {
    // Commented out the API call since we're using hardcoded data
    /*
    this.departmentService.getDepartmentsByOfficeId(this.officeId).subscribe(
      (response) => {
        console.log('Department API Response:', response);
        this.departmentNames = Array.isArray(response)
          ? response
          : response?.departments || [];
        console.log('Departments:', this.departmentNames);
      },
      (error) => {
        console.error('Error fetching departments:', error);
        this.departmentNames = [];
      }
    );
    */
  }

  // Rest of the methods remain exactly the same
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
  
    // For hardcoded data, we'll just filter the existing employees
    const deptFromDepartments = this.departmentNames.find(
      (dept) => dept.dept_name === this.department
    )?.dept_name;
  
    this.filteredEmployees = this.employees
      .filter((emp) => emp.department === deptFromDepartments)
      .map((emp) => ({
        name: emp.name,
        code: emp.code || '',
        department: emp.department,
        status: emp.code ? '' : 'checkbox',
      }));
  
    if (this.filteredEmployees.length === 0) {
      this.filteredEmployees.push({
        name: 'No Employee Found',
        code: '',
        department: this.department,
        status: 'checkbox',
      });
    }
  
    this.tableVisible = true;
  }
}
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admission-list',
  templateUrl: './admission-list.component.html',
  styleUrls: ['./admission-list.component.scss']
})
export class AdmissionListComponent {
  searchText: string = '';

  displayedColumns: string[] = [
    'srNo',
    'studentName',
    'email',
    'mobile',
    'course',
    'admissionDate',
    'status',
    'salesPerson',
    'source',
    'pipelinePhase'
  ];

  dataSource = new MatTableDataSource([
    { studentName: 'John Doe', email: 'john@example.com', mobile: '9876543210', course: 'Angular', admissionDate: new Date(), status: 'Active', salesPerson: 'Ravi', source: 'Online', pipelinePhase: 'Follow-up' },
    { studentName: 'Jane Smith', email: 'jane@example.com', mobile: '9123456789', course: 'Node.js', admissionDate: new Date(), status: 'Pending', salesPerson: 'Amit', source: 'Referral', pipelinePhase: 'Enquiry' }
  ]);

  onAddAdmission() {
    console.log('Open Add Admission Modal');
  }
}

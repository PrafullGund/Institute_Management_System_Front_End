import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {

  limit = 10;
  currentPage = 1;
  totalCourse = 0;

  course: any[] = [];
  dataSource = new MatTableDataSource<any>([]);

  displayedColumns: string[] = [
    'srNo',
    'courseName',
    'description',
    'courseFees',
    'courseMode',
    'courseDuration',
    'typeName',
    'action'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.loadCourse();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadCourse(page: number = 1) {
    this.courseService.getAllCourse(page, this.limit).subscribe({
      next: (res: any) => {
        this.course = res.data.course;
        this.dataSource.data = res.data.course;
        this.totalCourse = res.data.total;
        this.currentPage = res.data.page;
      },
      error: (err) => console.error(err)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onPageChange(event: PageEvent) {
    this.limit = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.loadCourse(this.currentPage);
  }

}
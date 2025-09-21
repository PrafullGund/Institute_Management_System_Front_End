import { Component } from '@angular/core';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-courses-add',
  templateUrl: './courses-add.component.html',
  styleUrls: ['./courses-add.component.scss']
})
export class CoursesAddComponent {
 courseData = {
    courseName: '',
    description: '',
    courseFees: 0
  };

  constructor(private courseService: CourseService) { }

  addCourse() {
    // this.courseService.addCourse(this.courseData).subscribe({
    //   next: (res) => {
    //     console.log('Course added', res);
    //     // Close modal manually
    //     const modalEl = document.getElementById('addCourseModal');
    //     const modal = bootstrap.Modal.getInstance(modalEl);
    //     modal?.hide();
    //   },
    //   error: (err) => console.error('Error adding course', err)
    // });
  }
}

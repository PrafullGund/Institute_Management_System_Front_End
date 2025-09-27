import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CourseService } from 'src/app/service/course.service';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-courses-add',
  templateUrl: './courses-add.component.html',
  styleUrls: ['./courses-add.component.scss']
})
export class CoursesAddComponent {
  courseFrom!:FormGroup;

  constructor(
   private formBuilder:FormBuilder,
   private coursesService:CourseService,
   private dialogRef:MatDialogRef<CoursesAddComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.courseFrom=this.formBuilder.group({
      courseName:[''],
      courseFees:[''],
      courseDuration:[''],
      courseMode:[''],
      description:[''],
      typeName:[''],
      typeDescription:['']
    })
  }

  ngOnInit(){

  }

  saveCourse() {
    if(this.courseFrom.valid){
      this.coursesService.postAllCourse(this.courseFrom.value).subscribe({
        next:(val:any)=>{
          this.dialogRef.close(true);
        },
        error:(err:any)=>{
          console.error('Error adding course:', err);
        }
      });
    }else{
       console.log('Form is invalid');
    }
  }
}

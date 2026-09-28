import {Component} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-course-list',
  imports: [TranslatePipe],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList {

}

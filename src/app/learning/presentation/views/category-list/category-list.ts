import {Component} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-category-list',
  imports: [TranslatePipe],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
export class CategoryList {

}

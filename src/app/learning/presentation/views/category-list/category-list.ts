import {Component, computed, inject, viewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {LearningStore} from '../../../application/learning.store';
import {MatError} from '@angular/material/form-field';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {TranslatePipe} from '@ngx-translate/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';

@Component({
  selector: 'app-category-list',
  imports: [MatTableModule, MatError, MatProgressSpinner, TranslatePipe, MatPaginator, MatSort, MatSortHeader],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
export class CategoryList {
  readonly store = inject(LearningStore);
  displayedColumns: string[] = ['id', 'name'];
  readonly sort = viewChild(MatSort);
  readonly paginator = viewChild(MatPaginator);

  readonly dataSource = computed(() => {
    const source = new MatTableDataSource(this.store.categories());
    const sort = this.sort();
    if (sort) {
      source.sort = sort;
    }
    const paginator = this.paginator();
    if (paginator) {
      source.paginator = paginator;
    }
    return source;
  });
}

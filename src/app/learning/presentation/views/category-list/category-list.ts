import {Component, computed, inject, viewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {LearningStore} from '../../../application/learning.store';
import {MatError} from '@angular/material/form-field';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';

@Component({
  selector: 'app-category-list',
  imports: [MatTableModule, MatButtonModule, MatError, MatProgressSpinner, TranslatePipe, MatIcon, MatPaginator, MatSort, MatSortHeader],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
export class CategoryList {
  readonly store = inject(LearningStore);
  protected router = inject(Router);
  displayedColumns: string[] = ['id', 'name', 'actions'];
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

  editCategory(id: number) {
    this.router.navigate(['learning/categories', id, 'edit']).then();
  }

  deleteCategory(id: number) {
    this.store.deleteCategory(id);
  }

  navigateToNew() {
    this.router.navigate(['learning/categories/new']).then();
  }
}

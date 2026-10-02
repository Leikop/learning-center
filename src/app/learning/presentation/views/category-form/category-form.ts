import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LearningStore} from '../../../application/learning.store';
import {Category} from '../../../domain/model/category.entity';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {TranslatePipe} from '@ngx-translate/core';
import {BaseForm} from '../../../../shared/presentation/components/base-form/base-form';

@Component({
  selector: 'app-category-form',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css'
})
export class CategoryForm extends BaseForm {
  #fb = inject(FormBuilder);
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #store = inject(LearningStore);

  form = this.#fb.group({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });

  isEdit = false;
  categoryId: number | null = null;

  constructor() {
    super();
    this.#route.params.subscribe(params => {
      this.categoryId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.categoryId;
      if (this.isEdit && this.categoryId) {
        const id = this.categoryId;
        const category = this.#store.getCategoryById(id)();
        if (category) {
          this.form.patchValue({ name: category.name });
        }
      }
    });
  }

  submit() {
    if (this.form.invalid) return;

    const category: Category = new Category({
      id: this.categoryId ?? 0,
      name: this.form.value.name!
    });

    if (this.isEdit) {
      this.#store.updateCategory(category);
    } else {
      this.#store.addCategory(category);
    }

    this.#router.navigate(['learning/categories']).then();
  }
}

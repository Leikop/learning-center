import {Injectable} from '@angular/core';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {Category} from '../domain/model/category.entity';
import {CategoriesApiEndpoint} from './categories-api-endpoint';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LearningApi extends BaseApi {
  readonly #categoriesEndpoint = new CategoriesApiEndpoint(this.http);

  getCategories(): Observable<Category[]> {
    return this.#categoriesEndpoint.getAll();
  }

  getCategory(id: number): Observable<Category> {
    return this.#categoriesEndpoint.getById(id);
  }

  createCategory(category: Category): Observable<Category> {
    return this.#categoriesEndpoint.create(category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.#categoriesEndpoint.update(category, category.id);
  }

  deleteCategory(id: number): Observable<void> {
    return this.#categoriesEndpoint.delete(id);
  }
}

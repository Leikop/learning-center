import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import {Category} from '../domain/model/category.entity';
import {LearningApi} from '../infrastructure/learning-api';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {retry} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LearningStore {
  readonly #learningApi = inject(LearningApi);
  readonly #categoriesSignal = signal<Category[]>([]);
  readonly categories = this.#categoriesSignal.asReadonly();
  readonly categoryCount = computed(() => this.categories().length);
  readonly #loadingSignal = signal<boolean>(false);
  readonly loading = this.#loadingSignal.asReadonly();
  readonly #errorSignal = signal<string | null>(null);
  readonly error = this.#errorSignal.asReadonly();

  constructor() {
    this.#loadCategories();
  }

  getCategoryById(id: number): Signal<Category | undefined> {
    return computed(() => id ? this.categories().find(c => c.id === id) : undefined);
  }

  addCategory(category: Category): void {
    this.#loadingSignal.set(true);
    this.#errorSignal.set(null);
    this.#learningApi.createCategory(category).pipe(retry(2)).subscribe({
      next: createdCategory => {
        this.#categoriesSignal.update(categories => [...categories, createdCategory]);
        this.#loadingSignal.set(false);
      },
      error: err => {
        this.#errorSignal.set(this.#formatError(err, 'Failed to create category'));
        this.#loadingSignal.set(false);
      }
    });
  }

  updateCategory(updatedCategory: Category): void {
    this.#loadingSignal.set(true);
    this.#errorSignal.set(null);
    this.#learningApi.updateCategory(updatedCategory).pipe(retry(2)).subscribe({
      next: category => {
        this.#categoriesSignal.update(categories =>
          categories.map(c => c.id === category.id ? category : c)
        );
        this.#loadingSignal.set(false);
      },
      error: err => {
        this.#errorSignal.set(this.#formatError(err, 'Failed to update category'));
        this.#loadingSignal.set(false);
      }
    });
  }

  deleteCategory(id: number): void {
    this.#loadingSignal.set(true);
    this.#errorSignal.set(null);
    this.#learningApi.deleteCategory(id).pipe(retry(2)).subscribe({
      next: () => {
        this.#categoriesSignal.update(categories => categories.filter(c => c.id !== id));
        this.#loadingSignal.set(false);
      },
      error: err => {
        this.#errorSignal.set(this.#formatError(err, 'Failed to delete category'));
        this.#loadingSignal.set(false);
      }
    });
  }

  #loadCategories(): void {
    this.#loadingSignal.set(true);
    this.#errorSignal.set(null);
    this.#learningApi.getCategories().pipe(takeUntilDestroyed()).subscribe({
      next: categories => {
        this.#categoriesSignal.set(categories);
        this.#loadingSignal.set(false);
        this.#errorSignal.set(null);
      },
      error: err => {
        this.#errorSignal.set(this.#formatError(err, 'Failed to load categories'));
        this.#loadingSignal.set(false);
      }
    });
  }

  #formatError(error: unknown, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? `${fallback}: Not found` : error.message;
    }
    return fallback;
  }
}

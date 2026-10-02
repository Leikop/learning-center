import {computed, inject, Injectable, signal} from '@angular/core';
import {Category} from '../domain/model/category.entity';
import {LearningApi} from '../infrastructure/learning-api';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

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

import {Routes} from '@angular/router';

const categoryList = () => import('./views/category-list/category-list').then(m => m.CategoryList);
const courseList = () => import('./views/course-list/course-list').then(m => m.CourseList);
const categoryForm = () => import('./views/category-form/category-form').then(m => m.CategoryForm);

export const learningRoutes: Routes = [
  { path: 'categories',           loadComponent: categoryList },
  { path: 'categories/new',       loadComponent: categoryForm },
  { path: 'categories/:id/edit',  loadComponent: categoryForm },
  { path: 'courses',              loadComponent: courseList }
];

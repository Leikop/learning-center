import {Routes} from '@angular/router';

const categoryList = () => import('./views/category-list/category-list').then(m => m.CategoryList);
const courseList = () => import('./views/course-list/course-list').then(m => m.CourseList);

export const learningRoutes: Routes = [
  { path: 'categories', loadComponent: categoryList },
  { path: 'courses',    loadComponent: courseList }
];

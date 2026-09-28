import {Component, signal} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    RouterLinkActive
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  options = signal([
    {link: '/home', label: 'Home'},
    {link: '/about', label: 'About Us'},
    {link: '/learning/categories', label: 'Categories'},
    {link: '/learning/courses', label: 'Courses'}
  ]);
}

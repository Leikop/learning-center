import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css'
})
export class PageNotFound implements OnInit {
  protected invalidPath = '';
  #route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.invalidPath = this.#route.snapshot.url.map(url => url.path).join('/');
  }
}

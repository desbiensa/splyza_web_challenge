import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterpathService {
    private currentPathSubject = new BehaviorSubject<string>('');
    currentPath$ = this.currentPathSubject.asObservable();
  
    constructor(private router: Router) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.currentPathSubject.next(event.url);
        }
      });
    }
  
    getCurrentPath(): string {
      return this.currentPathSubject.value;
    }
}

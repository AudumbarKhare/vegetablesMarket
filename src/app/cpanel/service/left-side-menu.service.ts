import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeftSideMenuService {

  isMenuOpen:boolean = true;
  contentMargin:number = 240;

  constructor() { }

  onToolbarMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen;

    if(!this.isMenuOpen) {
      this.contentMargin = 0;
    } else {
      this.contentMargin = 240;
    }
    
  }
}

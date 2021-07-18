import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LeftSideMenuService } from '../service/left-side-menu.service';
declare var $: any;

@Component({
  selector: 'app-left-side-menu',
  templateUrl: './left-side-menu.component.html',
  styleUrls: ['./left-side-menu.component.scss']
})
export class LeftSideMenuComponent implements OnInit {

  constructor(public _leftSideService: LeftSideMenuService) { }
  
  @Output() contentMargin = new EventEmitter<number>()

  ngOnInit(): void {
    this.sendcontentMargin();
    $("#menu-toggle").click(function(e:any) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
   });
   $("#menu-toggle-2").click(function(e:any) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled-2");
      $('#menu ul').hide();
   });
   
   const initMenu = () => {
      $('#menu ul').hide();
      $('#menu ul').children('.current').parent().show();
      //$('#menu ul:first').show();
      $('#menu li a').click(
         () => {
            var checkElement = $(this).next();
            if ((checkElement.is('ul')) && (checkElement.is(':visible'))) {
               return false;
            }
            if ((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
               $('#menu ul:visible').slideUp('normal');
               checkElement.slideDown('normal');
               return false;
            }
            return false;
         }
      );
   }
   $(document).ready(function() {
      initMenu();
   });
  }

  

  sendcontentMargin() {
    this.contentMargin.emit(this._leftSideService.contentMargin);
  }
}

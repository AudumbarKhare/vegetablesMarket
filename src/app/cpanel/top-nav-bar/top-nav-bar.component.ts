import { Component, OnInit } from '@angular/core';
import { LeftSideMenuService } from '../service/left-side-menu.service';
declare var $: any;
@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {

  constructor(public _leftSideMenuService:LeftSideMenuService) { }

  ngOnInit(): void {
    
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

}

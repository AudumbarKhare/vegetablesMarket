import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AddToCardService } from 'src/app/service/add-to-card.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,AfterViewInit {

  logginStatus: boolean = false;

  @ViewChild('stickyMenu') menuElement!: ElementRef;
  sticky: boolean = false;
  elementPosition: any;

  productCount!: number;
  totalPrice!: number;
  username: any = "User Name";
  imageUrl?: any;
  countFavoriteProducts?: number;

  constructor(public _addToCardService: AddToCardService, private _loginService: LoginService) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.isLoggedStatusIn();
    this.totalProductCount();
    this.countFavoriteProduct();
    this.productPrice();
    this._addToCardService.totalCardItem();
    this._addToCardService.totalFavoriteProduct();
    this._addToCardService.calculateBill();
  }

  /////scrolling navbar////////
  ngAfterViewInit() {
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {

    //const windowScroll = window.pageXOffset;
    const windowScroll = window.pageYOffset;
    //console.log(windowScroll+' '+this.elementPosition);
    if (windowScroll > 70) {
      document.getElementById('navbar_top')?.classList.add('fixed-top');
    } else {
      document.getElementById('navbar_top')?.classList.remove('fixed-top');
    }

  }
  //////////////get user info/////////////
  getUserInfo() {
    this._loginService.loginUser.subscribe(res => {
      //console.log(res?.username);
      this.username = res?.username;
      if (res?.image_url == '') {
        this.imageUrl = '../../../assets/images/user1.png';
      } else {
        this.imageUrl = res?.image_url;
      }
    })
  }
  ////////////get total count of product/////////
  totalProductCount() {
    
     //this._addToCardService.totalCardItem();
     this._addToCardService.currentProductCount.subscribe(res => {
      this.productCount = res;
      
    })
  }
  /////////////total price of product price///////////
  productPrice() {
    this._addToCardService.currenTotalPrice.subscribe(res => {
      this.totalPrice = res;
    })
  }

  /////total count of favorite product//////////
  countFavoriteProduct() {
    this._addToCardService.currentFavoriteCard.subscribe(res => {
      this.countFavoriteProducts = res;
    })
  }
  ///////////////////////to check login status///////////////////
  isLoggedStatusIn() {
    if (this._loginService.isLoggedIn()) {
      this.logginStatus = true;
    } else {
      this.logginStatus = false;
    }
  }

  ///user log out
  logout() {
    this._loginService.userLogOut();
    this.isLoggedStatusIn();
  }



}

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { MessengerService } from '../service/messenger.service';
import { AddToCardService } from '../service/add-to-card.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public _addToCardService:AddToCardService,
    private _productService:ProductService,
    private _mesService:MessengerService
    ) { }
  collapsed = false;
  slides!: Product[];
  //slides: Product[]=[];
  
  ngOnInit(): void {
    this.getSlidersProduct();
  }

  getSlidersProduct(){
    this._productService.getSliderProduct().subscribe(res=>{
      this.slides=res;
    })
  }
  
  slideConfig = {
    "slidesToShow": 3, 
    "slidesToScroll": 1,
    "nextArrow": "<button class='slider-button next-button slick-arrow' style='display: block;'><img src='../assets/icons/next.svg' alt=''></button>",
    "prevArrow": "<button class='slider-button prev-button slick-arrow' style='display: block;'><img src='../assets/icons/pre.svg' alt=''></button>",
    "autoplay": true,
    
    "autoplaySpeed": 2000,
    'responsive': [{
      'breakpoint': 768,
      'settings': {    
          'slidesToShow': 2,
          'slidesToScroll': 2,
          
          'arrows': true,
          'dots': false
        }
      },
      {
      'breakpoint': 600,
      'settings': {    
          'slidesToShow': 1,
          'slidesToScroll': 1,
         
          'arrows': true,
          'dots': false
        }
      }]
    
  };

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  addToCard(slide:any){
    this._addToCardService.addToCard(slide);
  }
  addToFavorite(favoriteProduct:Product){
    this._addToCardService.addToFavorites(favoriteProduct);
  }

}

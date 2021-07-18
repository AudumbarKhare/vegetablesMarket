import { Injectable } from '@angular/core';
import {Product} from '../models/product';
import { BehaviorSubject, from, Subject } from 'rxjs';
import { map, toArray } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AddToCardService {
  product:Product[]=[];
  favoriteProduct:Product[]=[];
  productList = from(this.product);
  totalCardPrice:number=0;
  private itemExit:boolean=false;
  //currentFavoriteCard?:number=0;

  //using rxjs subject behavior for product count/////////
  productCount=new BehaviorSubject<number>(0);
  currentProductCount = this.productCount.asObservable();
  
  //favorite product count///
  favoriteCount = new BehaviorSubject<number>(0);
  currentFavoriteCard = this.favoriteCount.asObservable();

  //using rxjs subject behavior for total card price//////////
  totalPrice=new BehaviorSubject<number>(0);
  currenTotalPrice = this.totalPrice.asObservable();

  constructor(private _toastr:ToastrService) { }

  //////////////add to card function////////////
  addToCard(item:Product){
      if(this.product.length===0){
        this.itemExit = true;
      }else{
        for(let i in this.product){
          //////////chech duplicate item//////////
          if((this.product[i].item_id == item.item_id)){
            this.itemExit=false;
            break;
          }else{
            this.itemExit=true;
          }
        }
      }
      if(this.itemExit){
        this.product.push(item);
        localStorage.setItem('products',JSON.stringify(this.product));
        this.totalCardItem();
        this.calculateBill();
        this._toastr.success('Item added Successfully',''); 
      }else{
        this._toastr.error('This Item All Ready Exit','');
      }
  }

  /////////////get item form add to card///////////////
  getCardAddedProduct(){
    return JSON.parse(localStorage.getItem('products') || '{}');
  }

  ////total count of item from add to card////
  totalCardItem(){
    return this.productCount.next(this.product.length);
  }

  

  //////calculate total bill///
  calculateBill(){
    this.totalCardPrice=0;
    const productList = JSON.parse(localStorage.getItem('products') || '{}');
    productList.forEach((item:Product)=>{
      this.totalCardPrice +=(item.qty*item.item_sales_price);
    })
   this.totalPrice.next(this.totalCardPrice);
  }

  updateProductCard(removeProduct:any){
        localStorage.removeItem('products');
        localStorage.setItem('products',JSON.stringify(removeProduct));
        this.totalCardItem();
        this.calculateBill();
      
  }
  ///////add to Favorite//////////
  addToFavorites(favoriteItem:Product){
    if(this.favoriteProduct.length===0){
      this.itemExit=true;
    }else{
      for(let i in this.favoriteProduct){

        if(this.favoriteProduct[i].item_id == favoriteItem.item_id){
          this.itemExit = false;
          break;
        }else{
          this.itemExit = true;
        }

      }
    }

    if(this.itemExit){
       this.favoriteProduct.push(favoriteItem);
       localStorage.setItem('favoriteProduct',JSON.stringify(this.favoriteProduct));
        this.totalFavoriteProduct();
       this._toastr.success('Item Added Successfuly');
    }else{
      this._toastr.error('This Item All Ready Exit');
    }
  }

  //total favorite of item count//////
  totalFavoriteProduct(){
   return this.favoriteCount.next(this.favoriteProduct.length);
  }

  /////////////get item form add to favorite///////////////
getCardFavoriteProduct(){
  return JSON.parse(localStorage.getItem('favoriteProduct') || '{}');
}

//update favorite item//
updateFavoriteProductCard(favoriteProduct:any){
  localStorage.removeItem('favoriteProduct');
  localStorage.setItem('favoriteProduct',JSON.stringify(favoriteProduct));
  this.totalFavoriteProduct();
}

}



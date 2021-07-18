import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
import { Product } from '../models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpClient:HttpClient) { }

  //get all the records to on product page
  getProduct(){
    return this._httpClient.get<Product[]>(environment.api_url+'product/getAllProduct.php')
  }

  //get single records by item_id
  getProductById(item_id:any){
    return this._httpClient.get<Product>(environment.api_url+'product/getProductById.php?item_id='+item_id)
  }

  //get images dynamically for silder product/getSliderProduct.php
  getSliderProduct(){
    return this._httpClient.get<Product[]>(environment.api_url+'product/getSliderProduct.php');
  }

  //get product by price range
  getProductByPriceRange(start_price:number,end_price:number){
    return this._httpClient.get<Product[]>(environment.api_url+'product/getProductPriceRange.php?start_price='+start_price+'&end_price='+end_price);
  }

  //get product by category 
  getProductByCategory(category_id:number){
    return this._httpClient.get<Product[]>(environment.api_url+'product/getProductByCategory.php?category_id='+category_id);
  }

  //get product by discount
  getProductByDiscount(start_discount:number,end_discount:number){
    return this._httpClient.get<Product[]>(environment.api_url+'product/getProductByDiscount.php?start_discount='+start_discount+'&end_discount='+end_discount)
  }

  //serach product
  serachProducts(serachText:string){
    return this._httpClient.get<Product[]>(environment.api_url+'product/serachProduct.php?serachText='+serachText);
  }

  //get all category
  getAllCategory(){
    return this._httpClient.get<Category[]>(environment.api_url+'category/getAllCategory.php');
  }
}

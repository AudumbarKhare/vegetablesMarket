import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { AddToCardService } from 'src/app/service/add-to-card.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  messageTitle?: string;
  messageDescription?: string;

  constructor(private _productService: ProductService, private _addToCardService: AddToCardService) { }
  productList: Product[] = [];
  page: number = 1;
  totalRecords!: number;
  ngOnInit(): void {
    this.showProduct();
  }

  /////show all product at once//////////
  showProduct() {
    this._productService.getProduct().subscribe(res => {
      this.productList = res;

    })
  }


  // //////////show product by price range////////////////
  change_name_age(data?: any) {
    this.showProductByPriceRange(+data['startNo'], +data['endNo']);
  }

  showProductByPriceRange(start_price: number, end_price: number) {
    this._productService.getProductByPriceRange(start_price, end_price).subscribe(res => {
      this.productList = res;
      this.messageTitle = start_price+' To '+end_price+' Not Avaible This Price Range Product';
      this.messageDescription = 'Please, Search Other Price Product';
    })
  }

  // //////////show product by category////////////
  getProductByCategory(category_id: number) {
    this.showProductByCategory(category_id);
  }
  showProductByCategory(category_id: number) {
    this._productService.getProductByCategory(category_id).subscribe(res => {
      this.productList = res;
      this.messageTitle = 'Not Added Search Category Product Yet';
      this.messageDescription = 'Please, Search Other Category Product';
    })
  }

  // /////////show product by discount////////

  showProductByDiscount(data?: any) {
    this._productService.getProductByDiscount(+data['dist_start_point'], +data['dis_end_point']).subscribe(res => {
      this.productList = res;
      this.messageTitle = 'Discount Not Avaible Between '+data['dist_start_point']+' To '+data['dis_end_point'];
      this.messageDescription = 'Please, Search Other Type Of Discount';
    })
  }

  ///////////serach product/////////
  serachProduct(serachProduct: Product[]) {
    this.productList = serachProduct;
    this.messageTitle = 'No Search Product Found';
    this.messageDescription = 'Please, Search Other Product';

  }


  addToCard(product: Product) {
    this._addToCardService.addToCard(product);
  }

  addToFavorite(favoriteProduct: Product) {
    this._addToCardService.addToFavorites(favoriteProduct);
  }

}

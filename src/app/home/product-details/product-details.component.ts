import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AddToCardService } from 'src/app/service/add-to-card.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productList!: Product;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _productService: ProductService,
    private _addToCardService: AddToCardService
  ) { }

  ngOnInit(): void {
    //const id = this.route.snapshot.paramMap.get('id');
    //this.getProductById(id);
    this.route.paramMap.subscribe(res=>{
      this.getProductById(res.get('id'));
    })
  }

  getProductById(id: any) {
    from(this._productService.getProductById(id)).subscribe((res: Product) => {
      this.productList = res;
    })
  }

  addToCard(product: Product) {
    this._addToCardService.addToCard(product);
  }

}

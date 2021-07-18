import {  Component, OnInit, Output,  EventEmitter, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-right-side-bar',
  templateUrl: './right-side-bar.component.html',
  styleUrls: ['./right-side-bar.component.scss']
})
export class RightSideBarComponent implements OnInit, AfterViewInit {

  categoryList:Category[]=[];

  @ViewChild('serachText') searchText?:ElementRef;

  @Output() productEvent = new EventEmitter<object>();
  @Output() productCategory = new EventEmitter<number>();
  @Output() productDiscount = new EventEmitter<object>();
  @Output() productSerach = new EventEmitter<Product[]>();

  constructor(private _productService:ProductService) { }
  

  ngOnInit(): void {
     this.getAllCategoryType();
  }

  ngAfterViewInit():void{
    const searchText = fromEvent<any>(this.searchText?.nativeElement, 'keyup').pipe(
      map(event=>event.target.value),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(data=>this._productService.serachProducts(data))
    );

    searchText.subscribe(res=>{
      this.serachProduct(res);
    })
  }
  
/////////////send product price to parent for display product by price range
  showProductByPriceRange(start:string,end:string){
    this.productEvent.emit({startNo:start,endNo:end});
  }
  //////////send product category to display product by category
  showProductByCategory(category_id:string){
    this.productCategory.emit(+category_id);
  }

  /////send product discount range to parent for display product by discount reange
  displayProductByDiscount(start_dis_point:string,end_dis_point:string){
    this.productDiscount.emit({dist_start_point:start_dis_point,dis_end_point:end_dis_point});
  }
//////////search product //////////
  serachProduct(serachText:Product[]){
    this.productSerach.emit(serachText);
  }


  //get all category type
 getAllCategoryType(){
  this._productService.getAllCategory().subscribe(res=>{
    this.categoryList=res;
    //console.table(this.categoryList);
  })
}
}

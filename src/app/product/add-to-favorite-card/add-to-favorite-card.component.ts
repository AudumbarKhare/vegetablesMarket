import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AddToCardService } from 'src/app/service/add-to-card.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-add-to-favorite-card',
  templateUrl: './add-to-favorite-card.component.html',
  styleUrls: ['./add-to-favorite-card.component.scss']
})
export class AddToFavoriteCardComponent implements OnInit {

  favoriteItem:Product[]=[];

  page:number=1;
  totalRecords!:number;

  messageTitle = 'No Favourite Products Found';
	messageDescription = 'Please, choose your favourite products';

  constructor(private _addToCardService:AddToCardService) { }

  ngOnInit(): void {
    this.getAllFavoriteProduct();
  }
///////////get all favorite/////////
  getAllFavoriteProduct(){
    const FP = from(this._addToCardService.getCardFavoriteProduct());
    FP.subscribe((res:any)=>{
      this.favoriteItem?.push(res);
    })
  }
////////delete product from favorite product////////////
deleteFavoriteProduct(favoriteProduct:Product){
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this imaginary file!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {

    const idx = this.favoriteItem.indexOf(favoriteProduct);
  this.favoriteItem?.splice(idx, 1);
  this._addToCardService.updateFavoriteProductCard(this.favoriteItem);

      Swal.fire(
        'Deleted!',
        'Product has been deleted.',
        'success'
      )
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })
  
}
//////////add to card////////////
  addToCard(f_item:Product){
    this._addToCardService.addToCard(f_item);
  }


}

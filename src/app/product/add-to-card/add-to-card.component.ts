import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Product } from '../../models/product';
import { AddToCardService } from '../../service/add-to-card.service';
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-to-card',
  templateUrl: './add-to-card.component.html',
  styleUrls: ['./add-to-card.component.scss']
})
export class AddToCardComponent implements OnInit {


  messageTitle = 'No Products Found in Cart';
  messageDescription = 'Please, Add Product to Cart';

  constructor(public _addToCardService: AddToCardService, private _toastr: ToastrService) { }
  addProductToCard: Product[] = [];
  ngOnInit(): void {
    this.showProductToCart();
  }

  //////////show product into cart//////////
  showProductToCart() {
    from(this._addToCardService.getCardAddedProduct()).subscribe((res: any) => {
      this.addProductToCard.push(res);
    })
  }

  ////////////////delete product from card////////////
  removeProduct(addProduct: Product) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        var idx = this.addProductToCard.indexOf(addProduct);
        this.addProductToCard.splice(idx, 1);
        this._addToCardService.updateProductCard(this.addProductToCard);


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

  ///////////add qty////////////
  addQty(item: Product, no: number) {
    item.qty += no;

    if (item.qty <= 0) {
      this._toastr.warning('Sorry! You can not take qty less than One');
      item.qty = 1;
    }
    console.log(this.addProductToCard);
    this._addToCardService.updateProductCard(this.addProductToCard);
  }


}

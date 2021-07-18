import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-product-found',
  templateUrl: './no-product-found.component.html',
  styleUrls: ['./no-product-found.component.scss']
})
export class NoProductFoundComponent implements OnInit {

  @Input("title") title?:string;
  @Input("description") description?:string;

  constructor() { }

  ngOnInit(): void {
  }

}

export class Product {
    // id!: number;
    // product_name!:string;
    // description!: string;
    // price!: number;
    // imageUrl!: string;
    // qty!:number;
    // unit!:string;
    // category!:string;
    // constructor(id=0,product_name='',description='',price=0,imageUrl='',qty=0,unit='',category=''){
    //     this.id=id;
    //     this.product_name=product_name;
    //     this.description=description;
    //     this.price=price;
    //     this.imageUrl=imageUrl;
    //     this.qty=qty;
    //     this.unit = unit;
    //     this.category = category;
    // }

item_id!:number;
item_code!:string;
item_name!:string;
item_marathi_name!:string;
item_category_id!:number;
item_unit_id!:number;
item_image!:string;
description!:string;
item_sales_price!:number;
item_purchase_price!:number;
dis_per!:number;
dis_amount!:number;
tax_per!:number;
tax_amount!:number;
item_in_stock!:number;
total_purchase_amount!:number;
total_sales_amount!:number;
total_stock_amount!:number;
total_purchase_item!:number;
total_sales_item!:number;
stock_status!:string;
status!:number;
uom_code!:string;
category_name!:string;
qty!:number;
}

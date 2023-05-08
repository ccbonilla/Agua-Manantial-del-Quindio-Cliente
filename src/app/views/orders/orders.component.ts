import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule,NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { ProductService } from 'src/app/services/products/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  products: Product[] = [];

  parte1: Product[] = [];
  parte2: Product[] = [];
  parte3: Product[] = [];
  
  productSize: number = 0;
  currentItem = 0;

  images = [102,91,93,193,110].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(
    private productService: ProductService
  ) {}


  ngOnInit(): void {
    console.log("El componente se ha inicializado");
    setInterval(() => {
      this.currentItem = (this.currentItem + 1) % 3;
    }, 5000);
    this.getProducts();
  }

  getProducts() {
    this.productService.get('list').subscribe((prods) => {
    this.products = prods;
    console.log("Result productos: "+prods);
    this.productSize = Object.keys(prods).length;
    console.log("Result size: "+this.productSize);

    this.parte1 = prods.slice(0, Math.ceil(prods.length / 3));
    this.parte2 = prods.slice(Object.keys(this.parte1).length, Math.ceil(prods.length / 3) * 2);
    this.parte3 = prods.slice(Object.keys(this.parte1).length + Object.keys(this.parte2).length);
    });
  }
}
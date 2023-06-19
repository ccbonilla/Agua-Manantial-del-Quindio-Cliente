import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule,NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatSidenavModule} from '@angular/material/sidenav';

import { ProductService } from 'src/app/services/products/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  productData: any[] = [];
  products: Product[] = [];
  dividedArray: any[][] = [];
  showFiller = false;
  
  productSize: number = 0;
  cartItemsCount = 0;
  isCartOpen = false;

  images = [102,91,93,193,110].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(
    private productService: ProductService
  ) {}

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  ngOnInit(): void {
    console.log("El componente se ha inicializado");
    this.getProducts();
  }

  getProducts() {
    this.productService.get('list').subscribe((prods) => {
    this.products = prods;
    this.productSize = Object.keys(prods).length;

    for (let i = 0; i < this.productSize; i += 3) {
      const subArray = this.products.slice(i, i + 3);
      this.dividedArray.push(subArray);
    }
    });
  }

  addButtonClicked(item: any) {
    console.log("Item a ingresar *" + JSON.stringify(item) );
    const newProduct = {
      imageSrc: "/assets/agua600ml.jpg",
      title: item.name, 
      price: item.value,
      isFreeShipping: true
    };
    this.productData.push(newProduct);
    this.cartItemsCount++;
  }

  value: number = 0;

  increment() {
    this.value++;
  }

  decrement() {
    if (this.value > 0) {
      this.value--;
    }
  }
}
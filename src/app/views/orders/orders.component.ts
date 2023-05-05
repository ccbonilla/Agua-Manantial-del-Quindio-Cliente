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

  images = [102,91,93,193,110].map((n) => `https://picsum.photos/id/${n}/900/500`);


  constructor(
    private productService: ProductService
  ) {}


  ngOnInit(): void {
  }

  getProducts() {
    this.productService.get('list').subscribe((prods) => {
    this.products = prods;
    });
  }
}
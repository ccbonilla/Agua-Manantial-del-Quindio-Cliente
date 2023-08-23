import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  productData: any[] = [];
  cliente: User = new User();
  
  productos = [
    {
      name: 'Tambo Filandia',
      quantity: 'Un lugar especial para disfrutar de un buen café',
      price: 'price',
    },
    {
      name: 'Valle de Cócora',
      quantity: 'Description',
      price: 'price2',
    },
    { name: 'Salento', quantity: 'Pueblo mágico', price: 'price2' },
  ];

  constructor(
    private localStorage: LocalStorageService,
  ) { }

  ngOnInit(): void {
  }

}

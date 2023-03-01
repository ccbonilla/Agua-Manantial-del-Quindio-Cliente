import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  
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

  constructor() { }

  ngOnInit(): void {
  }

}

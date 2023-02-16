import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  
  beers = [
    {
      name: 'Tambo Filandia',
      quantity: 'Un lugar especial para disfrutar de un buen café',
      price: 'price',
    },
    {
      name: 'Valle de Cócora',
      quantity: 'Hogar del Loro Orejiamarillo y de la emblemática palma de cera',
      price: '/assets/fondo-2.jpeg',
    },
    { name: 'Salento', quantity: 'Pueblo mágico', price: '/assets/fondo-3.jpeg' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

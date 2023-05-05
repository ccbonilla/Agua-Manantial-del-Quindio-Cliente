import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  images = [
    {
      title: 'Tambo Filandia',
      short: 'Un lugar especial para disfrutar de un buen café',
      src: '/assets/fondo-1.jpeg',
    },
    {
      title: 'Valle de Cócora',
      short: 'Hogar del Loro Orejiamarillo y de la emblemática palma de cera',
      src: '/assets/fondo-2.jpeg',
    },
    { title: 'Salento', short: 'Pueblo mágico', src: '/assets/fondo-3.jpeg' },
  ];

  ngOnInit(): void {
  }

}

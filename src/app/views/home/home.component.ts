import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  backgroundImage1 = 'url(https://www.65ymas.com/uploads/s1/15/22/65/tipos-de-agua-embotellada1.jpeg)';

  backgroundImage2 = 'url(https://3.bp.blogspot.com/-40TK5LMSn0w/WsTrAXGu0yI/AAAAAAAADBY/YuG1NKgCpCEu0G09bUQSNq2KsPLA_0LZgCLcBGAs/s1600/manantial.jpg)';

  backgroundImage3 = 'url(https://www.65ymas.com/uploads/s1/15/22/65/tipos-de-agua-embotellada1.jpeg)';

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

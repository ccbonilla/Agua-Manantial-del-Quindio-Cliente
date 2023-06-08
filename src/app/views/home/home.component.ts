import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  backgroundImage1 = 'url(https://cdn.pixabay.com/photo/2013/12/17/20/10/bubbles-230014_1280.jpg)';

  backgroundImage2 = 'url(https://3.bp.blogspot.com/-40TK5LMSn0w/WsTrAXGu0yI/AAAAAAAADBY/YuG1NKgCpCEu0G09bUQSNq2KsPLA_0LZgCLcBGAs/s1600/manantial.jpg)';

  backgroundImage3 = 'url(https://images.unsplash.com/photo-1561041695-d2fadf9f318c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80)';

  backgroundImage4 = 'url(https://cdn.pixabay.com/photo/2017/02/02/15/15/bottle-2032980_1280.jpg)';

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

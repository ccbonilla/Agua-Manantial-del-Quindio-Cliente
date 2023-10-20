import { Component, OnInit } from '@angular/core';
import { sectionService } from 'src/app/services/sectionService/section.service';
import { Section } from 'src/app/models/section';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sectionList: Section [] = [];

  backgroundImages: string[] = [
  ];

  constructor(private sectionService: sectionService) {}

  getInfo() {
    this.sectionService.get('list').subscribe((res) => {
      console.log('get sections '+JSON.stringify(res));
      this.sectionList = res.filter((section: Section) => section.visible === true);
      this.sectionList.sort((a, b) => a.posicion - b.posicion);
      this.sectionList.forEach((section: Section) => {
        console.log('IMAGE TO ADD '+section.image);
        this.backgroundImages.push('url('+section.image+')');
      });
      console.log('fianl background image '+JSON.stringify(this.backgroundImages));
    });
  }

  ngOnInit(): void {
    this.getInfo();
  }

}

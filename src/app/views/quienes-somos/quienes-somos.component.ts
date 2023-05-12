import { Component, OnInit } from '@angular/core';
import { Info } from 'src/app/models/info';
import { InfoService } from 'src/app/services/infoService/info.service';


@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.component.html',
  styleUrls: ['./quienes-somos.component.scss']
})
export class QuienesSomosComponent implements OnInit {

  aboutUs: string = '';
  mision: string = '';
  vision: string = '';
  phone: string = '';
  email: string = '';
  description: string = '';

  constructor(private infoService: InfoService) {}

  getInfo() {
    this.infoService.get('get-info/1').subscribe((info) => {
      this.aboutUs = info.description;
      this.mision = info.mision;
      this.vision = info.vision;
      this.phone = info.phone;
      this.email = info.email;
    });
  }

  ngOnInit(): void {
    this.getInfo();
  }

}

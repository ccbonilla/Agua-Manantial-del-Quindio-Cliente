import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  admin: boolean = false;
  constructor(private localStorageService: LocalstorageService<any>) {
    this.admin = this.localStorageService.getItem('admin');
  }

  ngOnInit(): void {
    this.admin = this.localStorageService.getItem('admin');

    console.log('admin', this.admin);
  }
}

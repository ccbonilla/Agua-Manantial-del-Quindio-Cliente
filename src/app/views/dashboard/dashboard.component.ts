import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private localStorageService: LocalstorageService<any>
  ) {}

  ngOnInit(): void {}
  logOut() {
    // this.localStorageService.setItem('admin', false);
    this.router.navigate(['']);
    // window.location.reload();
  }
}

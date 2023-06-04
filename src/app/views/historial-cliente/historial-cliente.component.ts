import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/users/users.service';
import { LoginUserComponent } from './modal/login-user/login-user.component';
import { MatDialog, DialogPosition } from '@angular/material/dialog';

@Component({
  selector: 'app-historial-cliente',
  templateUrl: './historial-cliente.component.html',
  styleUrls: ['./historial-cliente.component.scss']
})
export class HistorialClienteComponent implements OnInit {

  isModalOpen = false;
  cliente: User = new User();
  closeResult = '';

  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUser();
    //this.openModal();
  }

  openDialog() {
    const position: DialogPosition = {
      left: '30%',
      top: '-220px',
    };
    const dialogRef = this.dialog.open(LoginUserComponent, {
      height: '400px',
      width: '630px',
      position: position,
    });
    dialogRef.afterClosed().subscribe((res) => {
      //this.getProducts();
    });
  }

  getUser() {
    this.userService.getById('find-by-id/1').subscribe((user) => {
      this.cliente = user;
      console.log('Lista** '+this.cliente);
      console.log('method** '+JSON.stringify(user) );
      console.log('method1** '+user.name);
      
    });
  }
}

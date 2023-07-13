import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/users/users.service';
import { LoginUserComponent } from './modal/login-user/login-user.component';
import { MatDialog, DialogPosition  } from '@angular/material/dialog';

@Component({
  selector: 'app-historial-cliente',
  templateUrl: './historial-cliente.component.html',
  styleUrls: ['./historial-cliente.component.scss']
})
export class HistorialClienteComponent implements OnInit {

  isModalOpen = true;
  cliente: User = new User();
  closeResult = '';
  datosUsuarioCargados = false;

  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.openDialog();
  }

  openDialog() {
    const position: DialogPosition = {
      left: '30%',
      top: '10%',
    };
    const dialogRef = this.dialog.open(LoginUserComponent, {
      height: '500px',
      width: '730px',
      position: position,
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.cliente = res;
      this.datosUsuarioCargados = true;
      //localStorage.setItem('usuario', res);
      //this.getUser();
    });
  }

  cancelar(): void {
  }

  getUser() {
    this.userService.getById('find-by-id/1').subscribe((user) => {
      this.cliente = user;
      
    });
  }
}

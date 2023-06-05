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
      console.log('Lista** '+res);
      console.log('method** '+JSON.stringify(res) );
      console.log('method1** '+res.name);
      this.datosUsuarioCargados = true;
      //this.getUser();
    });
  }

  cancelar(): void {
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

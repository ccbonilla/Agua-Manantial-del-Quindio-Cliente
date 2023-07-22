import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/users/users.service';
import { LoginUserComponent } from './modal/login-user/login-user.component';
import { MatDialog, DialogPosition  } from '@angular/material/dialog';
import { LocalStorageService } from 'angular-web-storage';
//import { LocalstorageService } from 'src/app/services/localstorage.service';

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

  constructor(private userService: UserService, private dialog: MatDialog, private localStorage: LocalStorageService,) { }

  ngOnInit(): void {
    console.log("init storage: " + JSON.stringify(this.localStorage)  );
    const loggedUser = this.localStorage.get('logged');
    if (loggedUser) {
      // Usuario logueado, puedes continuar con las operaciones que requieren el usuario logueado
      this.cliente = JSON.parse(loggedUser);
      this.datosUsuarioCargados = true;
    } else {
      // Usuario no logueado, abre el diálogo de login para que se loguee
      this.openDialog();
    }
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
      this.localStorage.set('logged', JSON.stringify(res));
      
      //localStorage.setItem('usuario', res);
      //this.getUser();
    });
  }

  logout(): void {
    // Elimina la información del usuario almacenada en el localStorage
    this.localStorage.remove('logged');
    this.cliente = new User();
    this.datosUsuarioCargados = false;
  }

  cancelar(): void {
  }
}

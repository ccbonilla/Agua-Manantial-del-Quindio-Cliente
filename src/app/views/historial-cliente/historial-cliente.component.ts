import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/users/users.service';
import { LoginUserComponent } from './modal/login-user/login-user.component';
import { MatDialog, DialogPosition  } from '@angular/material/dialog';
import { LocalStorageService } from 'angular-web-storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  constructor(
    private userService: UserService, 
    private dialog: MatDialog, 
    private localStorage: LocalStorageService, 
    private _snackBar: MatSnackBar,
    private router: Router,) { }

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
      
    });
  }

  logout(): void {

    this.localStorage.remove('logged');
    this.cliente = new User();
    this.datosUsuarioCargados = false;

    this._snackBar.open('¡Gracias por visitarnos! ¡Hasta pronto!', 'Cerrar', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 1500 // Duración del mensaje (en milisegundos)
    });
  
    // Redireccionar al home después de 3 segundos
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1500);
  }

  cancelar(): void {
  }
}

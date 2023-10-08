
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/users/users.service';
import { LoginUserComponent } from './modal/login-user/login-user.component';
import { MatDialog, DialogPosition  } from '@angular/material/dialog';
import { LocalStorageService } from 'angular-web-storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/models/order';
import { OrderService } from '../../services/orders/orders.service';

import Swal from 'sweetalert2';
//import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-historial-cliente',
  templateUrl: './historial-cliente.component.html',
  styleUrls: ['./historial-cliente.component.scss']
})
export class HistorialClienteComponent implements OnInit {

  dialogForm: FormGroup;
  promoRecarga: any[] = [];
  cantPromoRecarga = 0;
  isModalOpen = true;
  cliente: User = new User();
  closeResult = '';
  datosUsuarioCargados = false;
  mostrarX: boolean = true;
  orders: Order[] = [];
  
  userTypesList = ['cc', 'id'];
  states: string[] = [
    'Alabama fecha:23',
    'Alaska fecha:24',
    'Arizona'
  ]

  constructor(
    private userService: UserService, 
    private dialog: MatDialog, 
    private formBuilder: FormBuilder,
    private localStorage: LocalStorageService, 
    private cdRef: ChangeDetectorRef,
    private orderService: OrderService,
    private _snackBar: MatSnackBar,
    private router: Router,) { 
      this.dialogForm = this.formBuilder.group({
        cedula: ['', Validators.required],
        email: ['', Validators.required],
      });
    }

  ngOnInit(): void {
    console.log("init storage: " + JSON.stringify(this.localStorage)  );
    const loggedUserq = this.localStorage.get('usuario');
    console.log("init storage log: " + JSON.stringify(loggedUserq)  );
    const loggedUser = this.localStorage.get('logged');
    //localStorage.removeItem('usuario');
    if (loggedUser) {
      // Usuario logueado
      this.cliente = JSON.parse(loggedUser);
      this.crearPanelPromoDescuento();
      this.obtenerPedidosRecientes();
      this.datosUsuarioCargados = true;
      console.log("Cliente Data**: " + JSON.stringify(this.cliente)  );
    } else {
      // Usuario no logueado, abre el diálogo de login para que se loguee
      this.openDialog();
    }
  }

  obtenerPedidosRecientes() {
    this.orderService.get(`list-by-user/${this.cliente.user_id}`).subscribe((res) => { 
      
      res.forEach((order) => {
        if(order.order_state == 1){
          this.orderService.getOrderById(`find-by-id/${order.order_id}`).subscribe((resOrder) => {
            const orderPendiente: Order = resOrder;
            this.orders.push(orderPendiente);
            console.log('lista final orders * '+JSON.stringify(this.orders));
          });
          
        }
      });
    });
  }

  crearPanelPromoDescuento() {
    console.log("Promo Descu** userType: " + this.cliente.user_type_id );
    console.log("Promo Descu** count: " + this.cliente.count );
    var n;
    if (this.cliente.user_type_id === 1) {
      n = 7;
      this.cantPromoRecarga = 7;
    } else {
      n = 6;
      this.cantPromoRecarga = 6;
    } 
    this.promoRecarga = Array.from({ length: this.cliente.count }, () => true).concat(Array.from({ length: n - this.cliente.count }, () => false));
    console.log('lenght para panel '+this.promoRecarga.length);
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
      this.crearPanelPromoDescuento();
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

  editarPedido(order: any) {

    console.log('order before ROUTE '+JSON.stringify(order));

    // Navegar a la ruta del componente de destino y pasar los datos como parámetros
    this.router.navigate(['/orders', { order: JSON.stringify(order) }]);
  }
  cancelarPedido(order: any) {
    // this.dialog.open(EditarPedidoDialogComponent, {
    //   data: { order },
    // });
  }
}
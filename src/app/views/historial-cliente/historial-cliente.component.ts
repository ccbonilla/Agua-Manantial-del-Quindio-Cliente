import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/users/users.service';
import { LoginUserComponent } from './modal/login-user/login-user.component';
import { MatDialog, DialogPosition } from '@angular/material/dialog';
import { LocalStorageService } from 'angular-web-storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/models/order';
import { OrderService } from '../../services/orders/orders.service';
import { MatTableDataSource } from '@angular/material/table';
import { InfoService } from 'src/app/services/infoService/info.service';

import Swal from 'sweetalert2';
//import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-historial-cliente',
  templateUrl: './historial-cliente.component.html',
  styleUrls: ['./historial-cliente.component.scss'],
})
export class HistorialClienteComponent implements OnInit {
  dialogForm: FormGroup;
  promoRecarga: any[] = [];
  cantPromoRecarga = 0;
  usuarioConPromo = true;
  isModalOpen = true;
  cliente: User = new User();
  closeResult = '';
  datosUsuarioCargados = false;
  mostrarX: boolean = true;
  orderRuta: number = 0;
  orderEntregado: number = 0;
  ordersRecientes: Order[] = [];
  ordersHistorial: Order[] = [];
  dataSource: MatTableDataSource<Order>;
  telProveedor: string = '';

  userTypesList = ['cc', 'id'];

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private localStorage: LocalStorageService,
    private cdRef: ChangeDetectorRef,
    private orderService: OrderService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private infoService: InfoService
  ) {
    this.dialogForm = this.formBuilder.group({
      cedula: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.dataSource = new MatTableDataSource(this.ordersRecientes);
  }

  ngOnInit(): void {
    this.infoService.get('get-info/1').subscribe((info) => {
      this.telProveedor = info.phone;
    });
    console.log('init storage: ' + JSON.stringify(this.localStorage));
    const loggedUserq = this.localStorage.get('usuario');
    console.log('init storage log: ' + JSON.stringify(loggedUserq));
    const loggedUser = this.localStorage.get('logged');
    //localStorage.removeItem('usuario');
    if (loggedUser) {
      // Usuario logueado
      this.cliente = JSON.parse(loggedUser);
      this.crearPanelPromoDescuento();
      this.obtenerListaPedidos();
      this.datosUsuarioCargados = true;
      console.log('Cliente Data**: ' + JSON.stringify(this.cliente));
    } else {
      // Usuario no logueado, abre el diálogo de login para que se loguee
      this.openDialog();
    }
  }

  navegarIniciarPedido() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: 'Ya puedes iniciar tu pedido',
    });
    this.router.navigate(['/orders']);
  }

  obtenerListaPedidos() {
    this.orderEntregado = 0;
    this.orderRuta = 0;
    this.orderService
      .get(`list-by-user/${this.cliente.user_id}`)
      .subscribe((res) => {
        res.forEach((order) => {
          this.orderService
            .getOrderById(`find-by-id/${order.order_id}`)
            .subscribe((resOrder) => {
              const orderPendiente: Order = resOrder;
              if (order.order_state == 1) {
                this.ordersRecientes.push(orderPendiente);
              } else if (order.order_state == 2) {
                this.orderRuta++;
              }  else if (order.order_state == 3) {
                this.orderEntregado++;
              }

              this.ordersHistorial.push(orderPendiente);

              console.log(
                'lista final ordersRecientes * ' +
                  JSON.stringify(this.ordersRecientes)
              );
            });
        });
      });
  }

  crearPanelPromoDescuento() {
    console.log('Promo Descu** userType: ' + this.cliente.user_type_id);
    console.log('Promo Descu** count: ' + this.cliente.count);
    var n;
    if (this.cliente.user_type_id === 1) {
      n = 7;
      this.cantPromoRecarga = 7;
    } else if (this.cliente.user_type_id === 4) {
      this.usuarioConPromo = false;
      n = 0;
    } else {
      n = 6;
      this.cantPromoRecarga = 6;
    }
    this.promoRecarga = Array.from(
      { length: this.cliente.count },
      () => true
    ).concat(Array.from({ length: n - this.cliente.count }, () => false));
    console.log('lenght para panel ' + this.promoRecarga.length);
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
      this.obtenerListaPedidos();
      this.localStorage.set('logged', JSON.stringify(res));
    });
  }
  editarInformacionPersonal() {
    console.log('Result Enviado Edit Cliente ' + JSON.stringify(this.cliente));
    const objetoJSON = JSON.stringify(this.cliente);
    const position: DialogPosition = {
      left: '30%',
      top: '10%',
    };
    const dialogRef = this.dialog.open(LoginUserComponent, {
      height: '500px',
      width: '730px',
      position: position,
      data: objetoJSON,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log('After EDIT ' + JSON.stringify(res));
        this.cliente = res;
        this.datosUsuarioCargados = true;
        this.localStorage.set('logged', JSON.stringify(res));
      }
    });
  }

  logout(): void {
    this.localStorage.remove('logged');
    this.localStorage.remove('actualizarPedido');
    this.cliente = new User();
    this.datosUsuarioCargados = false;

    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: `¡Gracias por visitarnos! ¡Hasta pronto!' `,
    });

    // Redireccionar al home después de 3 segundos
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1500);
  }

  validarPedidoEditable(): void {

  }

  editarPedido(order: any) {
    this.orderService.getOrderById(`find-by-id/${order.order_id}`).subscribe((res) => {
      console.log('Result Consultar Order ' + JSON.stringify(res));
      const orderIdReciente= res;
      if(orderIdReciente.order_state == 1){
        console.log('order before ROUTE ' + JSON.stringify(order));
        this.router.navigate(['/orders', { order: JSON.stringify(order) }]);
      } else {
        Swal.fire({
          title: `Lo sentimos este pedido ya se encuentra en ruta`,
          icon: 'warning',
          html: `Intenta recargar la página o ponerte en contacto con el proveedor ${this.telProveedor}`,
          showCancelButton: true,
          focusConfirm: false,
          cancelButtonText: '<i class="fa fa-thumbs-up"></i> OK',
          cancelButtonAriaLabel: 'Thumbs up, Confirmar!',
          cancelButtonColor: '#1bb4e1', 
          confirmButtonText: 'Recargar página',
          confirmButtonAriaLabel: 'Thumbs up',
          confirmButtonColor: '#0d6efd',
        }).then((result) => {
          
          if (result.isConfirmed) {
            console.log("IR a mis pedidos");
            window.location.reload();
          } else {
          }
        });
      }
    });
  }

  cancelarPedido(order: any) {
    this.orderService.getOrderById(`find-by-id/${order.order_id}`).subscribe((res) => {
      console.log('Result Consultar Order ' + JSON.stringify(res));
      const orderIdReciente= res;
      if(orderIdReciente.order_state == 1){
        this.orderService.del(`delete/${order.order_id}`).subscribe((res) => {
          console.log('Result Borrar Order ' + JSON.stringify(res));
          Swal.fire({
            title: `Pedido cancelado correctamente`,
            icon: 'success',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Ok',
            confirmButtonColor: '#0d6efd',
          }).then((result) => {
            this.ordersRecientes = [];
            this.ordersHistorial = [];
            this.orderRuta--;
            this.crearPanelPromoDescuento();
            this.obtenerListaPedidos();
          });
        });
      } else {
        Swal.fire({
          title: `Lo sentimos este pedido ya se encuentra en ruta`,
          icon: 'warning',
          html: `Intenta recargar la página o ponerte en contacto con el proveedor ${this.telProveedor}`,
          showCancelButton: true,
          focusConfirm: false,
          cancelButtonText: '<i class="fa fa-thumbs-up"></i> OK',
          cancelButtonAriaLabel: 'Thumbs up, Confirmar!',
          cancelButtonColor: '#1bb4e1', 
          confirmButtonText: 'Recargar página',
          confirmButtonAriaLabel: 'Thumbs up',
          confirmButtonColor: '#0d6efd',
        }).then((result) => {
          
          if (result.isConfirmed) {
            console.log("IR a mis pedidos");
            window.location.reload();
          } else {
            //window.location.reload();
            //this.router.navigate(['/historialcliente']);
          }
        });
      }
    });
  }
}

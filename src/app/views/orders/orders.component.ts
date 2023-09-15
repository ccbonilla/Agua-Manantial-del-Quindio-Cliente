import { Component, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatSnackBar} from '@angular/material/snack-bar';
import { LocalStorageService } from 'angular-web-storage';
import { User } from 'src/app/models/user';

import { Order } from 'src/app/models/order';
import { OrderService } from '../../services/orders/orders.service';
import { ProductService } from 'src/app/services/products/product.service';
import { Product } from '../../models/product';
 
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {

  costoTotalPedido: number = 0;
  productData: any[] = [];
  products: Product[] = [];
  dividedArray: any[][] = [];
  showFiller = true;
  loading: boolean = true;
  cliente: User = new User();

  productSize: number = 0;
  cartItemsCount = 0;
  isCartOpen = false;

  images = [102,91,93,193,110].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(
    private productService: ProductService,
    private _snackBar: MatSnackBar,
    private localStorage: LocalStorageService,
    private orderService: OrderService,
  ) {}

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  toggleFiller() {
    this.showFiller = !this.showFiller;
  }

  
  validarUserLogged() {
    const loggedUser = this.localStorage.get('logged');
    if (loggedUser) {
      // Usuario logueado 
      this.cliente = JSON.parse(loggedUser);
      console.log("cliente logueado "+this.cliente);
      this.generateOrder();
      //this.datosUsuarioCargados = true;
    } else {

      // Usuario no logueado, abre el diálogo de login para que se loguee
      //this.openDialog();
    }
  }

  generateOrder() {
    console.log("cliente logueado "+this.cliente.user_id);
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    console.log(formattedDate);

    const orderInstance = new Order(
      this.cliente.user_id, // user_id
      formattedDate, // order_date
      0, // discount
      1, // payment_type_id
      this.productData // array de productos
    );
    console.log(orderInstance);
    this.orderService
      .post('create', orderInstance)
      .subscribe((res) => {
        if (res.status == '200') {
          console.log(res);
          console.log('crear Order '+JSON.stringify(res));
        } else {
          console.log(res);
          console.log('Error crear Order '+JSON.stringify(res));
        }
        
      });
  }

  ngOnInit(): void {
    console.log("El componente se ha inicializado");
    this.getProducts();
    const localPedido = this.localStorage.get('pedidoUsuario');
    if (localPedido) {
      this.productData = JSON.parse(localPedido);
      this.cartItemsCount = Object.keys(this.productData).length;
    } else {
      
    }
  }

  actuaizarPedidoUsuario() {
    this.localStorage.remove('pedidoUsuario');
    this.localStorage.set('pedidoUsuario', JSON.stringify(this.productData));
  }
  getProducts() {
    this.productService.get('list').subscribe((prods) => {
    this.products = prods;
    this.productSize = Object.keys(prods).length;

    for (let i = 0; i < this.productSize; i += 3) {
      const subArray = this.products.slice(i, i + 3);
      this.dividedArray.push(subArray);
    }
    this.loading = false;
    });
  }

  addButtonClicked(item: any) {
    console.log("Item a ingresar *" + JSON.stringify(item) );

    const index = this.productData.findIndex(product => product.product_id === item.product_id);
    console.log("Index Encontrado *" + index );
    
    if (index == -1) {
      const newProduct = {
      imageSrc: "/assets/agua600ml.jpg",
      title: item.name, 
      price: item.value,
      isFreeShipping: true,
      product_id: item.product_id,
      product_cant: 1
      };
      this.productData.push(newProduct);
      this.cartItemsCount++;
      
    } else {
      this.productData[index].product_cant += 1;
    }
    this.actuaizarPedidoUsuario();
    this.openSnackBar();
  }

  deleteButtonProduct(item: any) {
    console.log("Item a eliminar *" + JSON.stringify(item) );
    console.log("Item a eliminar id**" + JSON.stringify(item.product_id) );

    const index = this.productData.findIndex(product => product.product_id === item.product_id);

    // Verificar si se encontró el producto
    if (index !== -1) {
      // Eliminar el producto de la lista
      console.log("entro eliminar**" );
      this.productData.splice(index, 1);
      this.cartItemsCount--;
      this.actuaizarPedidoUsuario();
    }
  }

  increment(item: any) {
    console.log("Item a incrementar *" + JSON.stringify(item) );

    const index = this.productData.findIndex(product => product.product_id === item.product_id);
    console.log("Index Encontrado incrementar *" + index );
    
    if (index !== -1) {
      this.productData[index].product_cant += 1;
    } else {
    }
    this.actuaizarPedidoUsuario();
  }

  decrement(item: any) {
    console.log("Item a decrementar *" + JSON.stringify(item) );

    const index = this.productData.findIndex(product => product.product_id === item.product_id);
    console.log("Index Encontrado decrementar *" + index );
    
    if (index !== -1 && this.productData[index].product_cant > 1) {
      this.productData[index].product_cant -= 1;
    } else {
    }
    this.actuaizarPedidoUsuario();
  }

  getTotal(): number {
    let total = 0;
    for (let product of this.productData) {
      total += product.price * product.product_cant;
    }
    return total;
  }

  openSnackBar() {
    this._snackBar.open('Añadido!!', 'X', {
      horizontalPosition: "center",
      verticalPosition: "bottom", //bottom top
      duration: 1 * 1000,
      panelClass: ['centered-snackbar']
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar} from '@angular/material/snack-bar';
import { LocalStorageService } from 'angular-web-storage';
import { User } from 'src/app/models/user';
import { ProductOrder } from 'src/app/models/product_order';
import { Order } from 'src/app/models/order';
import { OrderService } from '../../services/orders/orders.service';
import { ProductService } from 'src/app/services/products/product.service';
import { Product } from '../../models/product';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { OrderState } from 'src/app/models/order_state';
 
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
  OrderUpdate: Order = new Order();
  productsModel: ProductOrder[] = [];

  productSize: number = 0;
  cartItemsCount = 0;
  isCartOpen = false;

  images = [102,91,93,193,110].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(
    private productService: ProductService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private localStorage: LocalStorageService,
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  toggleFiller() {
    this.showFiller = !this.showFiller;
    //const Toast = Swal.mixin({
    //  toast: true,
    //  position: 'top',
    //  showConfirmButton: false,
    //  timer: 2000,
    //  timerProgressBar: true,
    //  didOpen: (toast) => {
    //    toast.addEventListener('mouseleave', Swal.resumeTimer)
    //  }
    //})
    //
    //Toast.fire({
    //  icon: 'success',
    //  title: ` añadido `,
    //})
  }

  
  validarUserLogged() {
    const loggedUser = this.localStorage.get('logged');
    if (loggedUser) {
      // Usuario logueado 
      this.cliente = JSON.parse(loggedUser);
      console.log("cliente logueado "+this.cliente);
      const actualizacionPedido = this.localStorage.get('actualizarPedido');
        if (actualizacionPedido) {
          console.log("Es actualizacion true");

          const productsModel0: any[] = [];
          this.productData.forEach((product) => {

            const index = this.OrderUpdate.products.findIndex(product0 => product0.product_id === product.product_id);

            console.log("Index Encontrado update order*" + index );
            if (index != -1) {
              this.OrderUpdate.products[index].product_cant = product.product_cant;
            }
          });
          this.OrderUpdate.customer = this.cliente;
          console.log("Order newactualizar"+JSON.stringify(this.OrderUpdate));
          console.log("Order ID newactualizar "+this.OrderUpdate.order_id);
          
          this.orderService.put(`update/${this.OrderUpdate.order_id}`, this.OrderUpdate).subscribe((sub) => {
            if(sub){
                this.localStorage.set('pedidoUsuario', null);
                this.localStorage.set('actualizarPedido', null);
                this.productData = [];

              this.orderService.getOrderById(`find-by-id/${this.OrderUpdate.order_id}`).subscribe((res) => { 
                Swal.fire({
                  title: `Pedido Actualizado correctamente con un descuento de $${res.discount}`,
                  icon: 'success',
                  html:
                    'Recuerda que puedes ver o actualizar los pedidos recientes en Mis Pedidos',
                  showCancelButton: true,
                  focusConfirm: false,
                  cancelButtonText: '<i class="fa fa-thumbs-up"></i> Genial!',
                  cancelButtonAriaLabel: 'Thumbs up, Confirmar!',
                  cancelButtonColor: '#1bb4e1', 
                  confirmButtonText: 'Mis Pedidos',
                  confirmButtonAriaLabel: 'Thumbs up',
                  confirmButtonColor: '#0d6efd',
                }).then((result) => {
                  if (result.isConfirmed) {
                    console.log("IR a mis pedidos");
                    this.router.navigate(['/historialcliente']);
                  } else {
                    this.router.navigate(['/historialcliente']);
                  }
                });
              });
            }
            console.log('result put '+sub);
          });
          
        } else {
          console.log("cliente logueado ");
          this.generateOrder();
        }
      
    } else {
      console.log("not cliente logueado ");
      // Usuario no logueado, abre el diálogo de login para que se loguee
      //this.openDialog();
    }
  }

  generateOrder() {
    console.log("array productos "+JSON.stringify(this.productData) );
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    console.log(formattedDate);

    this.productData.forEach((product) => {
      
      let newProduct = new ProductOrder();
      newProduct.product_cant = product.product_cant;
      newProduct.product_id = product.product_id;
      newProduct.name = product.product_name;
      newProduct.value = product.price;
      this.productsModel.push(newProduct);
    });
    console.log('total list model prod: '+ JSON.stringify(this.productsModel));

    let orderNew = new Order();
    orderNew.discount = 0;
    orderNew.order_date = formattedDate;
    orderNew.order_state = 1;
    orderNew.user_id = this.cliente.user_id;
    orderNew.payment_type_id = 1;
    orderNew.customer = this.cliente;
    orderNew.products = this.productsModel;
    
    console.log('Final order: '+orderNew);

    this.orderService.post('create', orderNew).subscribe((res) => {
      console.log('Result crear Order '+JSON.stringify(res));
      Swal.fire({
        title: `Pedido guardado correctamente con un descuento de $${res.discount}`,
        icon: 'success',
        html:
          'Recuerda que puedes ver o actualizar los pedidos recientes en Mis Pedidos',
        showCancelButton: true,
        focusConfirm: false,
        cancelButtonText: '<i class="fa fa-thumbs-up"></i> Genial!',
        cancelButtonAriaLabel: 'Thumbs up, Confirmar!',
        cancelButtonColor: '#1bb4e1', 
        confirmButtonText: 'Mis Pedidos',
        confirmButtonAriaLabel: 'Thumbs up',
        confirmButtonColor: '#0d6efd',
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("IR a mis pedidos");
          this.router.navigate(['/historialcliente']);
        } else {
          window.location.reload();
        }
      });
      this.localStorage.set('pedidoUsuario', null);
      this.productData = [];
    }); 
  }

  ngOnInit(): void {
    //this.localStorage.set('actualizarPedido', null);
    console.log("El componente ORDERS se ha inicializado");
    this.productService.get('list').subscribe((prods) => {
      this.products = prods;
      this.productSize = Object.keys(prods).length;
      
      for (let i = 0; i < this.productSize; i += 3) {
        const subArray = this.products.slice(i, i + 3);
        this.dividedArray.push(subArray);
      }
      this.getOrders();
      this.loading = false;
    });
  }

  getOrders() {
    this.route.params.subscribe((params) => {
      const orderData = params['order'];

      const localPedido = this.localStorage.get('actualizarPedido');
      if (orderData || localPedido) {
        if (orderData) {
          const order: Order = JSON.parse(orderData);
          this.OrderUpdate = order;
          this.localStorage.set('orderUpdate', JSON.stringify(order));
          console.log('Parámetros SI pasados ONINTIT orders '+order);
        } else if (localPedido) {
          const updateOrder = this.localStorage.get('orderUpdate');
          this.OrderUpdate = JSON.parse(updateOrder);
          this.cartItemsCount = Object.keys(this.productData).length;
        } 
        
        this.showFiller = false;
        const productsService: Product[] = [];
        for (const product of this.OrderUpdate.products) {

          const index = this.products.findIndex(product0 => product0.product_id === product.product_id);
          console.log("Index Encontrado *" + index );
          if (index != -1) {
            const newProduct = {
              imageSrc: "/assets/agua600ml.jpg",
              product_name: product.product_name, 
              price: this.products[index].value,
              isFreeShipping: true,
              product_id: product.product_id,
              product_cant: product.product_cant,
              };
              this.productData.push(newProduct);
              this.cartItemsCount++;

              productsService.push(this.products[index]);
              
          } else {
            
            console.log('Prodcuto no para actualizar no disponible');
          }
        }
        this.products = productsService;
        this.productSize = Object.keys(productsService).length;
        this.dividedArray = [];
        for (let i = 0; i < this.productSize; i += 3) {
          const subArray = this.products.slice(i, i + 3);
          this.dividedArray.push(subArray);
        }
        this.localStorage.set('actualizarPedido', 'True');
        this.actuaizarPedidoUsuario();
        
      } else {

        console.log('Parámetros no pasados ONINTIT orders');
        
        const localPedido = this.localStorage.get('pedidoUsuario');
        if (localPedido) {
          this.productData = JSON.parse(localPedido);
          this.cartItemsCount = Object.keys(this.productData).length;
        } else {
          
        }
      }
    });
  }
  actuaizarPedidoUsuario() {
    this.localStorage.remove('pedidoUsuario');
    this.localStorage.set('pedidoUsuario', JSON.stringify(this.productData));
  }
  
  addButtonClicked(item: any) {
    console.log("Item a ingresar *" + JSON.stringify(item) );

    const index = this.productData.findIndex(product => product.product_id === item.product_id);
    console.log("Index Encontrado *" + index );

    var newProduct = {};
    
    if (index == -1) {
      newProduct = {
      imageSrc: "/assets/agua600ml.jpg",
      product_name: item.name, 
      price: item.value,
      isFreeShipping: true,
      product_id: item.product_id,
      product_cant: 1
      };
      this.productData.push(newProduct);
      this.cartItemsCount++;
      
      this.openSnackBar(newProduct);
      
    } else {
      this.productData[index].product_cant += 1;
      this.openSnackBar(this.productData[index]);
    }
    this.actuaizarPedidoUsuario();
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

  openSnackBar(newProduct: any) {
    console.log('PAr to toast '+JSON.stringify(newProduct));
    var titleProduct = 'Item';
    if(newProduct){
      titleProduct = newProduct.product_name;
    }
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: `${titleProduct} añadido `,
    })
  }
}
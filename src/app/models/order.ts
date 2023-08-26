import { Product } from './product';
export class Order {
  user_id: number = 0;
  order_date: string = '';
  discount: number = 0;
  payment_type_id: number = 0;
  
  products: Product[] = [];
}

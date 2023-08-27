import { Product } from './product';
export class Order {
  user_id: number = 0;
  order_date: string = '';
  discount: number = 0;
  payment_type_id: number = 0;
  products: Product[] = [];

  constructor(
    user_id: number,
    order_date: string,
    discount: number,
    payment_type_id: number,
    products: Product[]
  ) {
    this.user_id = user_id;
    this.order_date = order_date;
    this.discount = discount;
    this.payment_type_id = payment_type_id;
    this.products = products;
  }
}

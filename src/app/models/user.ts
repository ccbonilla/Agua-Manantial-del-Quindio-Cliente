export class User {
  user_id: number = 0;
  name: string = '';
  lastname: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  address_detail: string = '';
  user_type_id: number = 0;
  user_type_name: string = '';
  count: number = 0;
  identification: number = 0;
  lat?: number = 0;
  lon?: number = 0;
  ticket: boolean = false;
  password: string = '';
  birthdate = new Date();
}

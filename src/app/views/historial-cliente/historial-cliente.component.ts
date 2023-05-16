import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/users/users.service';

@Component({
  selector: 'app-historial-cliente',
  templateUrl: './historial-cliente.component.html',
  styleUrls: ['./historial-cliente.component.scss']
})
export class HistorialClienteComponent implements OnInit {

  customers: User[] = [];

  cliente: User = new User();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.get('find-by-id/1').subscribe((users) => {
      this.customers = users;
      //this.cliente = users;

      
      
      //console.log('SERVICIO GET USER 1: '+this.customers);
      //console.log('SERVICIO GET USER 2: '+Object.keys(users).length);
      //console.log('SERVICIO GET USER 3: '+JSON.stringify(users));
    });
  }
}

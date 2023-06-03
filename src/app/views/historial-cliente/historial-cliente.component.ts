import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/users/users.service';
import { LoginUserComponent } from './modal/login-user/login-user.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-historial-cliente',
  templateUrl: './historial-cliente.component.html',
  styleUrls: ['./historial-cliente.component.scss']
})
export class HistorialClienteComponent implements OnInit {

  modalRef: any;
  isModalOpen = false;
  cliente: User = new User();
  closeResult = '';

  constructor(private userService: UserService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getUser();
    //this.openModal();
  }

  //openModal() {
  //  this.modalService.open(contentModal, { ariaLabelledBy: 'modal-basic-title' }).result.then(
  //    (result) => {
  //      this.closeResult = `Cerrado con: ${result}`;
  //    },
  //    (reason) => {
  //    }
  //  );
  //}

  getUser() {
    this.userService.getById('find-by-id/1').subscribe((user) => {
      this.cliente = user;
      console.log('Lista** '+this.cliente);
      console.log('method** '+JSON.stringify(user) );
      console.log('method1** '+user.name);
      
    });
  }
}

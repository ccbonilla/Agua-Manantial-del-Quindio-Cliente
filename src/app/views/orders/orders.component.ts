import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);

  open() {
		const modalRef = this.modalService.open(OrdersComponent);
		modalRef.componentInstance.name = 'World';
	}


  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
  }

}

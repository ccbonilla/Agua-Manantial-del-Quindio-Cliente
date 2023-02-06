import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  open() {
		const modalRef = this.modalService.open(OrdersComponent);
		modalRef.componentInstance.name = 'World';
	}

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
  }

}

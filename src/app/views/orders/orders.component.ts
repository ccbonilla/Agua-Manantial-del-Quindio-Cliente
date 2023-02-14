import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule,NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  images = [102,91,93,193,110].map((n) => `https://picsum.photos/id/${n}/900/500`);

  open() {
    //this.modalService.open(content, { size: 'xl' });
		const modalRef = this.modalService.open(OrdersComponent);
		modalRef.componentInstance.name = 'World';
	}


  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
  }

}
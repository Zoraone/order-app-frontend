import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Order } from './order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {

  id: string;
  order: Order;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) { }

  getOrders(): void {
    this.orderService.getOrder(this.id)
      .subscribe(order => this.order = order);
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getOrders();
  }
}

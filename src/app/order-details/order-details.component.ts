import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Cart } from '../cart/cart';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  id: string;
  orderCarts: Cart[];
  delivery: number;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) { }

  getOrderCarts(): void {
    this.orderService.getOrderCarts(this.id)
      .subscribe(carts => this.orderCarts = this.calculateTotals(carts));
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getOrderCarts();
  }

  private calculateTotals(carts: Cart[]): Cart[] {
    this.delivery = 600 / carts.length;
    for (const cart of carts) {
      let cartTotal = 0;
      for (const item of cart.items) {
        cartTotal += item.price;
        for (const customization of item.customizations) {
          for (const option of customization.options) {
            cartTotal += option.price;
          }
        }
      }
      cart.total = cartTotal + this.delivery;
    }
    return carts;
  }

}

import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { FormControl } from '@angular/forms';

import { CartService } from '../services/cart.service';
import { CartItem, Cart } from './cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, DoCheck {

  @Input() orderId: string;
  @Input() cartItems: CartItem[];
  total = 0;
  name = new FormControl('');

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
  }

  ngDoCheck() {
    if (this.cartItems) {
      this.total = 0;
      this.cartItems.forEach(item => {
        this.total += item.price;
        item.customizations.forEach(customization => {
          customization.options.forEach(option => {
            this.total += option.price;
          });
        });
      });
    }
  }

  remove(item: CartItem) {
    this.cartItems.splice(this.cartItems.indexOf(item), 1);
  }

  submit() {
    if (this.name.value === '') {
      return false;
    }
    if (this.cartItems.length === 0) {
      return false;
    }
    const cart: Cart = {
      orderId: this.orderId,
      username: this.name.value,
      items: this.cartItems
    };
    this.cartService.addCart(cart).subscribe();
    alert(JSON.stringify(cart));
  }
}

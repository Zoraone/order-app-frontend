import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { StoreService } from '../services/store.service';
import { Store } from './store';
import { ItemComponent } from '../item/item.component';
import { CartItem } from '../cart/cart';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})

export class StoreComponent implements OnInit {

  @Input() uuid: string;
  @Input() orderId: string;
  store: Store;
  cartItems: CartItem[];

  constructor(
    private storeService: StoreService,
    private dialog: MatDialog
  ) {
    this.cartItems = [];
  }

  getStore(): void {
    this.storeService.getStore(this.uuid)
      .subscribe(store => this.store = store);
  }

  ngOnInit() {
    this.getStore();
  }

  openDialog(itemUuid: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '650px';
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      uuid: itemUuid
    };

    const dialogRef = this.dialog.open(ItemComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(item => {
      if (item) {
        this.cartItems.push(item);
      }
    });
  }
}

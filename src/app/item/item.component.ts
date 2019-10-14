import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';

import { ItemService } from '../services/item.service';
import { Item, Customization, Option } from '../item/item';
import { CartItem, CartCustomization, CartOption } from '../cart/cart';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  uuid: string;
  item: Item;
  isSubmitted: boolean;

  constructor(
    private itemService: ItemService,
    private dialogRef: MatDialogRef<ItemComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.uuid = data.uuid;
    this.isSubmitted = false;
  }

  getItem(): void {
    this.itemService.getItem(this.uuid)
      .subscribe(item => {
        this.item = item;
      });
  }

  ngOnInit() {
    this.getItem();
  }

  close() {
    this.dialogRef.close();
  }

  submit(form: NgForm) {
    this.isSubmitted = true;
    if (!form.valid) {
      return false;
    }
    const cartItem = this.buildCartItem(form.value);
    this.dialogRef.close(cartItem);
    return true;
  }

  private buildCartItem(formValue: any): CartItem {
    console.log(formValue);
    const customizations: CartCustomization[] = [];
    for (const customizationUuid of Object.keys(formValue)) {
      const options: CartOption[] = [];
      const customization = this.getCustomizationDetails(customizationUuid);
      for (const thisUuid of Object.keys(formValue[customizationUuid])) {
        let optionUuid = '';
        if (thisUuid === customizationUuid) {
          optionUuid = formValue[customizationUuid][thisUuid];
          if (optionUuid === '') { continue; }
        } else {
          if (formValue[customizationUuid][thisUuid]) {
            optionUuid = thisUuid;
          } else {
            continue;
          }
        }
        const option = this.getOptionDetails(optionUuid, customization);
        const cartOption: CartOption = {
          uuid: optionUuid,
          title: option.title,
          price: option.price
        };
        options.push(cartOption);
      }
      const cartCustomization: CartCustomization = {
        uuid: customizationUuid,
        title: customization.title,
        options
      };
      if (cartCustomization.options.length > 0) {
        customizations.push(cartCustomization);
      }
    }
    const cartItem: CartItem = {
      uuid: this.item.uuid,
      title: this.item.title,
      price: this.item.price,
      customizations
    };
    return cartItem;
  }

  private getCustomizationDetails(uuid: string): Customization {
    return this.item.customizationList.find(customization => {
      if (uuid === customization.uuid) {
        return true;
      }
      return false;
    });
  }

  private getOptionDetails(uuid: string, customization: Customization): Option {
    return customization.options.find(option => {
      if (uuid === option.uuid) {
        return true;
      }
      return false;
    });
  }
}

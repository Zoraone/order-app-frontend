export class Item {
  constructor(
    public uuid: string,
    public title: string,
    public price: number,
    public itemDescription: string,
    public imageUrl: string,
    public customizationList: Customization[]
  ) { }
}

export class Customization {
  constructor(
    public uuid: string,
    public title: string,
    public minPermitted: number,
    public maxPermitted: number,
    public displayState: string,
    public options: Option[]
  ) { }
}

export class Option {
  constructor(
    public uuid: string,
    public title: string,
    public price: number,
    public defaultQuantity: number,
    public minPermitted: number,
    public maxPermitted: number,
    public isSoldOut: boolean
  ) { }
}

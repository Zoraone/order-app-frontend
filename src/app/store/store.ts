export class Store {
  constructor(
    public uuid: string,
    public title: string,
    public sections: Section[]
  ) { }
}

class Section {
  constructor(
    public uuid: string,
    public title: string,
    public subtitle: string,
    public isOnSale: boolean,
    public subsections: Subsection[]
  ) { }
}

class Subsection {
  constructor(
    public uuid: string,
    public title: string,
    public subtitle: string,
    public items: Item[]
  ) { }
}


class Item {
  constructor(
    public uuid: string,
    public title: string,
    public description: string,
    public price: number,
    public imageUrl: string
  ) { }
}

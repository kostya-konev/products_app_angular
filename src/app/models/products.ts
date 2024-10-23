export interface IProduct {
  id: number,
  title: string,
  price: number,
  year: number,
  image?: string,
  details: IProductDetails,
  quantity: number,
}

export interface IProductDetails {
  chip: string,
  SSD: string,
  memory: string,
  display: string
}

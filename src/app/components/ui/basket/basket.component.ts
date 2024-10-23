import { Component, OnInit } from '@angular/core';
import {IProduct} from "../../../models/products";
import {Subscription} from "rxjs";
import {ProductsService} from "../../../services/products.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket: IProduct[]
  basketSubscription: Subscription;

  constructor(private ProductsService: ProductsService) { }

  minusProductFromBasket(product: IProduct): void {
    if (product.quantity === 1) {
      this.ProductsService.deleteProductFromBasket(product.id).subscribe(() => {
        this.basket = this.basket.filter(basket => basket.id !== product.id);
      })
    } else {
      product.quantity -= 1;
      this.ProductsService.updateProductToBasket(product).subscribe((data) => {

      })
    }
  }

  plusProductToBasket(product: IProduct): void {
    product.quantity += 1;
    this.ProductsService.updateProductToBasket(product).subscribe((data) => {

    })
  }

  ngOnInit(): void {
    this.basketSubscription = this.ProductsService.getProductsFromBasket().subscribe((data) => {
      this.basket = data;
    })
  }

  ngOnDestroy(): void {
    this.basketSubscription.unsubscribe();
  }

}

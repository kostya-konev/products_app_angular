import { Component, OnInit } from '@angular/core';
import { IProduct } from "../../../models/products";
import { Subscription } from "rxjs";
import { ProductsService } from "../../../services/products.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogBoxComponent } from "../dialog-box/dialog-box.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor(private ProductsService: ProductsService, public dialog: MatDialog) { }

  products: IProduct[];
  productsSubscription: Subscription;
  canEdit: boolean = true;
  basket: IProduct[];
  basketSubscription: Subscription;

  openDialog(product?: IProduct): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    dialogConfig.data = product;

    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {

      if (data) {
        if (data?.id) {
          this.editItem(data);
        } else {
          this.postData(data);
        }
      }
    });
  }

  postData(data: IProduct) {
    this.ProductsService.postProduct(data).subscribe((data) => {
      this.products.push(data);
    })
  }

  deleteItem(id: number) {
    this.ProductsService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
    })
  }

  editItem(product: IProduct) {
    this.ProductsService.editProduct(product).subscribe((data) => {
      this.products = this.products.map(product => {
        if (product.id === data.id) return data;
        else return product;
      });
    })
  }

  addToBasket(product: IProduct) {
    product.quantity = 1;

    let foundItem = this.basket.find(item => item.id === product.id);

    if (foundItem) {
      this.updateToBasket(foundItem);
    } else {
      this.postToBasket(product);
    }
  }

  postToBasket(product: IProduct) {
    this.ProductsService.postProductToBasket(product).subscribe((data) => {
      this.basket.push(data);
    });
  }

  updateToBasket(product: IProduct) {
    product.quantity += 1;
    this.ProductsService.updateProductToBasket(product).subscribe((data) => {
    })
  }

  ngOnInit(): void {
    this.productsSubscription = this.ProductsService.getProducts().subscribe((data) => {
      this.products = data;
    })

    this.basketSubscription = this.ProductsService.getProductsFromBasket().subscribe((data) => {
      this.basket = data;
    })
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }

    this.basketSubscription.unsubscribe();
  }

}

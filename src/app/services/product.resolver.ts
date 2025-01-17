import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {catchError, EMPTY, Observable, of} from 'rxjs';
import {IProduct} from "../models/products";
import {ProductsService} from "./products.service";

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<IProduct> {

  constructor(private ProductsService: ProductsService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> {
    return this.ProductsService.getProduct(route.params?.['id']).pipe(
        catchError(() => {
          this.router.navigate(['/products']);
          return EMPTY;
        })
      );
  }
}

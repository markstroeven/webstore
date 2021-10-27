import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductResource {

  public constructor(private httpClient: HttpClient) {
  }

  public getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('/assets/mocks/products.json');
  }
}



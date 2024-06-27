import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { login, product, signin } from '../../../datatype';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  http = inject(HttpClient);
  changeHeader = new Subject();
  cartdata = new Subject();

  constructor() {}

  signin(data: signin) {
    return this.http.post('http://localhost:3000/user', data);
  }

  login(data: login) {
    return this.http.get(
      `http://localhost:3000/user?email=${data.email}&&password=${data.password}`
    );
  }

  addToCart(data: product) {
    return this.http.post('http://localhost:3000/cart', data);
  }

  getCart(data: string) {
    return this.http.get(`http://localhost:3000/cart?email=${data}`);
  }

  removeFromCart(id: number) {
    return this.http.delete(`http://localhost:3000/cart/${id}`);
  }

  getProducts() {
    return this.http.get<product>(`http://localhost:3000/products`);
  }
}

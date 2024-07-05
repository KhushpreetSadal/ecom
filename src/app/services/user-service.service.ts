import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { address, login, product, signin } from '../../../datatype';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  http = inject(HttpClient);

  changeHeader = new Subject();
  cartdata = new Subject();
  transcation = new Subject();

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

  saveAddress(data:address){
    return this.http.post<address>('http://localhost:3000/address',data)
  }

  getAddress(data:string){
    return this.http.get<any>(`http://localhost:3000/address?email=${data}`);
  }

  updateAddress(data:address){
    return this.http.patch(`http://localhost:3000/address/${data.id}`,data)
  }

  saveOrders(data:any){
    return this.http.post(`http://localhost:3000/orders`,data)

  }

  getOrders(data:string){
    return this.http.get<any>(`http://localhost:3000/orders?email=${data}`)
  }
}

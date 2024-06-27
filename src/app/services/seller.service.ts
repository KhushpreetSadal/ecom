import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { login, product, signin } from '../../../datatype';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  http = inject(HttpClient)

  constructor() { }

  signin(data:signin){
    return this.http.post("http://localhost:3000/seller",data)
  }

  login(data:login){
    return this.http.get(`http://localhost:3000/seller?email=${data.email}&&password=${data.password}`)
  }

  creatProduct(data:product){
    return this.http.post("http://localhost:3000/products",data)
  }

  getProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }
  getAlluserProducts(data:string){
    return this.http.get<product>(`http://localhost:3000/products?email=${data}`)
  }

  getAllProducts(){
    return this.http.get<product>(`http://localhost:3000/products`)
  }
  editProduct(data:product){
    return this.http.patch(`http://localhost:3000/products/${data.id}`,data)
  }

  deleteProduct(id:string){
    return this.http.delete(`http://localhost:3000/products/${id}`)

  }
}

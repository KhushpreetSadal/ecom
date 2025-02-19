import { Component, inject } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { product } from '../../../datatype';
import { CurrencyPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, CurrencyPipe, TitleCasePipe, NgIf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})

export class CartComponent {
  service = inject(UserServiceService);
  router = inject(Router)

  active = false;

  products: product | any = [];
  list = true;
  total = 0;

  constructor() {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    let local = localStorage.getItem('user');
    let user = local && JSON.parse(local);
    this.service.getCart(user[0].email).subscribe((res: product | any) => {
      if (res) {
        this.products = res;
        this.totalAmount(res)
        this.list = false;
      }
    });
  }

  removeFromCart(id: number) {
    if (id) {
      this.service.removeFromCart(id).subscribe((res) => {
        if (res) {
          this.service.cartdata.next('');
          this.getProducts();
        }
      });
    }
  }

  totalAmount(data:product|any){
    this.total = 0
    data.forEach((element:product) => {
      if(element){
        this.total = (Number(element.price)*Number(element.quantity)) + this.total
      }
    });

    if(this.total != 0){
      this.active = true
    }else{
      this.active = false
    }
  }

  buyNow(){
    this.router.navigate(['address'])
  }


}

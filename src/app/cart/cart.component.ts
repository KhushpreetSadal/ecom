import { Component, inject } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { product } from '../../../datatype';
import { CurrencyPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, CurrencyPipe, TitleCasePipe, NgIf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  service = inject(UserServiceService);
  products: product | any = [];
  list = true;

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
}

import { Component, Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SellerService } from '../services/seller.service';
import { product } from '../../../datatype';
import { CurrencyPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [NgFor, TitleCasePipe, CurrencyPipe, NgIf],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css',
})

@Injectable({
  providedIn: 'root',
})

export class ViewProductComponent {
  activatedroute = inject(ActivatedRoute);
  sellerservice = inject(SellerService);
  userService = inject(UserServiceService);

  product: product | any = [];
  quantity: number = 1;

  remove = false;
  added = false;
  removed = false
  eleid: any = ""
  ngOnInit(): void {
    this.getProduct();
    this.getUserProducts();
  }

  getProduct() {
    let id = this.activatedroute.snapshot.paramMap.get('id');
    if (id) {
      this.sellerservice.getProduct(id).subscribe((res: product | any) => {
        if (res) {
          this.product = res;
        }
      });
    }
  }

  plus() {
    if (this.quantity < 10) {
      this.quantity++;
    }
  }
  minus() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(data: product) {
    if (data) {
      let local = localStorage.getItem('user');
      let user = local && JSON.parse(local);
      console.log(data.id)
      data.productid = data.id;
      data.id = undefined;
      data.email = user[0].email;
      data.quantity = this.quantity;
      this.userService.addToCart(data).subscribe((res) => {
        if (res) {
          this.product = res;
          this.userService.cartdata.next('');
          this.remove = true;
          this.added = true;
          setTimeout(() => {
            this.added = false;
          }, 1500);
        } else {
          this.getProduct()
        }
      });
    }
  }

  removeFromCart(data: any) {
    if (data) {
      this.userService.removeFromCart(data.id).subscribe((res) => {
        if (res) {
          this.userService.cartdata.next('');
          this.remove = false;
          this.removed = true;
          setTimeout(() => {
            this.removed = false;
          }, 1500);



        }
      });
    }
  }

  getUserProducts() {
    let id = this.activatedroute.snapshot.paramMap.get('id');
    let local = localStorage.getItem('user');
    let user = local && JSON.parse(local);
    this.userService.getCart(user[0].email).subscribe((res: any) => {
      if (res) {
        console.log(res)
        res.forEach((element: product) => {
          if (element.productid == id) {
            this.remove = true;
            this.product = element;
          }
        });
      }
    });
  }
}

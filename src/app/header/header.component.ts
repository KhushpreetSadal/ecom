import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { FormsModule } from '@angular/forms';
import { product } from '../../../datatype';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, RouterLink, TitleCasePipe, FormsModule, NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  Loginstyle = true;
  userstyle = false;
  sellerstyle = false;

  service = inject(UserServiceService);
  router = inject(Router);

  user = '';
  cart = 0;

  searchValue: any = [];
  show = false;

  fillval=""

  constructor() {
    this.service.changeHeader.subscribe((res) => {
      if (res == 'Home') {
        this.userstyle = true;
        this.Loginstyle = false;
        this.sellerstyle = false;
        this.ngOnInit();
      } else if (res == 'Seller') {
        this.sellerstyle = true;
        this.Loginstyle = false;
        this.userstyle = false;
        this.ngOnInit();
      } else {
        this.Loginstyle = true;
        this.sellerstyle = false;
        this.userstyle = false;
        this.ngOnInit();
      }
    });

    this.service.cartdata.subscribe(() => {
      this.updateCart();
    });
  }

  ngOnInit(): void {
    this.checkUser();
    this.updateCart();
  }

  searchRes(data: any) {
    if (data.search && data.search != '') {
      this.service.getProducts().subscribe((res: product | any) => {
        if (res) {
          this.searchValue = [];

          res.forEach((element: any) => {
            let name = element.name.toLowerCase(element.name);
            let val = data.search.toLowerCase(data.search);
            if (name.includes(val)) {
              this.searchValue.push(element);
              this.show = true;
            }
          });
        }
      });
    } else {
      this.show = false;
    }
  }

  checkUser() {
    let user = localStorage.getItem('user');
    let seller = localStorage.getItem('seller');

    if (user && user.length > 2) {
      this.userstyle = true;
      this.Loginstyle = false;
      this.sellerstyle = false;
      let name = user && JSON.parse(user);
      this.user = name[0].name;
    } else if (seller && seller.length) {
      this.sellerstyle = true;
      this.Loginstyle = false;
      this.userstyle = false;
      let name = seller && JSON.parse(seller);
      this.user = name[0].name;
    } else {
      this.Loginstyle = true;
      this.userstyle = false;
      this.sellerstyle = false;
    }
  }

  logout() {
    if (localStorage.getItem('user')?.length) {
      localStorage.removeItem('user');
      this.router.navigate(['']);
      this.service.changeHeader.next('');
    }
    if (localStorage.getItem('seller')?.length) {
      localStorage.removeItem('seller');
      this.router.navigate(['']);
      this.service.changeHeader.next('');
    }
  }

  updateCart() {
    let local = localStorage.getItem('user');
    let user = local && JSON.parse(local);
    this.service.getCart(user[0].email).subscribe((res: any) => {
      if (res) {
        this.cart = res.length;
      }
    });
  }

  fill(data:string){
    if(data){
      this.fillval = data
      this.show = false
    }
  }



}

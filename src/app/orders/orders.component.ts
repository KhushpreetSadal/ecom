
import { Component, inject } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgIf, NgFor, TitleCasePipe, CurrencyPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  service = inject(UserServiceService)
  activatedRoute = inject(ActivatedRoute)

  products: any = []
  total = 0
  transid = ""
  list = false
  show = false

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders() {
    let local = localStorage.getItem('user');
    let user = local && JSON.parse(local);
    this.service.getOrders(user[0].email).subscribe((res: any) => {
      if (res) {
        this.products = res[0].products
        this.products.forEach((item: any) => {
          if (item.id) {
            this.removeProduct(item.id)
          }
          this.service.cartdata.next('');
        })
        this.total = res[0].totalAmmount
        this.transid = res[0].transactionid
        this.show = true
      }
    })
  }

  removeProduct(id: number) {

    this.service.removeFromCart(id).subscribe((res: any) => {
      if (res) {
        this.getOrders()
      }
    })
  }


}

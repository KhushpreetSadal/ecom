import { Component, ElementRef, ViewChild, inject } from '@angular/core';

import { UserServiceService } from '../services/user-service.service';
import { product } from '../../../datatype';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  service = inject(UserServiceService)
  router = inject(Router)

  products: any=[]
  total = 0

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

ngOnInit(): void {
  this.getProducts()
  this.saveOrders("","0","")
  window.paypal.Buttons(
    {
      style:{
        color:'blue',
        shape:'rect',
        label:'paypal',
        layout:'horizontal',
      },
      createOrder:(data:any,actions:any)=>{
        return actions.order.create({
          purchase_units:[
            {
              amount:{
                value:this.total.toString(),
                currency_code:'USD'
              }
            }
          ]
        })
      },
      onApprove: (data:any,actions:any)=>{
        return actions.order.capture().then((details:any)=>{
          if(details){
             this.saveOrders(details.id,this.total,details.status )
          }
        })
      },
      onError: (err:any)=>{
        this.router.navigate(['Error'])
      }
  }
).render(this.paymentRef.nativeElement);

}


  getProducts() {
    let local = localStorage.getItem('user');
    let user = local && JSON.parse(local);
    this.service.getCart(user[0].email).subscribe((res: product | any) => {
      if (res) {
        this.products = res;
        this.totalAmount(res)
        
      }
    });
  
  }

  totalAmount(data:product|any){
    this.total = 0
    this.products = data
    data.forEach((element:product) => {
      if(element){
        this.total = (Number(element.price)*Number(element.quantity)) + this.total
      }
    });
  }


  saveOrders(transactionid:any ,totalAmmount:any,status:any){

    if(status == "COMPLETED"){
      let orderData={
        products:[],
        totalAmmount:"",
        transactionid:"",
        email:""
      }
      let local = localStorage.getItem('user');
      let user = local && JSON.parse(local);
      this.service.getCart(user[0].email).subscribe((res: any) => {
        if (res) {
          orderData.products = res
          orderData.totalAmmount = this.total.toString()
          orderData.transactionid = transactionid
          orderData.email = user[0].email

    if(orderData){
      this.service.saveOrders(orderData).subscribe((res:any)=>{
        if(res){
          this.router.navigate([`Orders`])
        }
      })
    }
        }
      });
    }


  }

  
}


import { CurrencyPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { product } from '../../../datatype';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule,NgIf,NgFor,TitleCasePipe,CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

service = inject(SellerService)
router = inject(Router)

list:product|any = []

ngOnInit(): void {
  this.products()
  
}

products(){
  let local = localStorage.getItem('seller')
  let seller = local && JSON.parse(local)
  this.service.getAlluserProducts(seller[0].email).subscribe((res:product)=>{
    if(res){
      this.list = res
    }
  })
}


edit(id:string){
  if(id){
    this.router.navigate([`editProduct/${id}`])
  }
}


Delete(id:string){
  if(confirm("Are you sure?")){
    this.service.deleteProduct(id).subscribe((res)=>{
      console.log(res)
      this.products()
    })
  }
 
}

}
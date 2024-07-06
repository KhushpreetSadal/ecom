import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { product } from '../../../datatype';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  service = inject(SellerService)
  router = inject(Router)
  http = inject(HttpClient)

  added=false

  valid=false

  creat(data:product){

    if(data.name != "" && data.price != "" && data.image != "" && data.color != "" && data.category != "" && data.description != ""){
      let local = localStorage.getItem('seller')
      let seller = local &&JSON.parse(local)
      data.email = seller && seller[0].email
      this.service.creatProduct(data).subscribe((res)=>{
        if(res){
          this.added = true
          setTimeout(() => {
            this.added = false
            this.router.navigate(['Products'])
            
          }, 1500);

        }
      })
    }
    
  }




}



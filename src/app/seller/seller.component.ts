import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { login, signin } from '../../../datatype';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-seller',
  standalone: true,
  imports: [NgIf,FormsModule],
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css'
})
export class SellerComponent {

  service = inject(SellerService)
  Header = inject(UserServiceService)
  router = inject(Router)

  show=true

  noMatch = false
  valid = false

  signin(data:signin){
    if(data.email != "" && data.name != "" && data.password != ""){
      this.service.signin(data).subscribe((res)=>{
        let sellerdata = JSON.stringify(res)

        if(sellerdata && sellerdata.length>2){

          localStorage.setItem('seller',`[${sellerdata}]`)
          this.Header.changeHeader.next('Seller')
          this.router.navigate(["Products"]) 

        }else{
          this.noMatch = true

          setTimeout(() => {
            this.noMatch = false
          }, 1500);

        }

      })
    }else{
      this.valid  = true
      setTimeout(() => {
        this.valid = false
      }, 1500)
    }
  
  }
  

  
  login(data:login){
    if(data.email != "" && data.password != ""){

      this.service.login(data).subscribe((res)=>{
        let sellerdata = JSON.stringify(res)
        console.log(res)
        if(sellerdata.length>2){

          localStorage.setItem('seller',sellerdata)
          this.router.navigate(["Products"])
          this.Header.changeHeader.next("Seller")


        }else{
          this.noMatch = true

          setTimeout(() => {
            this.noMatch = false
          }, 1500);
        }
      })
    }else{
      this.valid  = true
      setTimeout(() => {
        this.valid = false
      }, 1500)
    }
    
  }


  change(){
    if(this.show == true){
      this.show = false

    }else{
      this.show = true

    }
  }
}

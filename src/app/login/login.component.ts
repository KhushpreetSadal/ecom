import { Component, inject } from '@angular/core';
import { login, signin } from '../../../datatype';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  router = inject(Router)
  service = inject(UserServiceService)
  
ngOnInit(): void {
  this.checkUser()
  
}

  show=true

  noMatch = false
  valid = false

  checkUser(){

    let user = localStorage.getItem("user")
    let seller = localStorage.getItem('seller')
    if(user && user.length>2){
      this.router.navigate(["Home"])
      this.service.changeHeader.next("Home")
    }else if(seller && seller.length>2){
      this.router.navigate(["Products"])
      this.service.changeHeader.next("Seller")
    }

  }

  login(data:login){
    if(data.email != "" && data.password != ""){
      this.service.login(data).subscribe((res)=>{
        let userdata = JSON.stringify(res)
        if(userdata.length>2){
          localStorage.setItem('user',userdata)
          this.router.navigate(["Home"])
          this.service.changeHeader.next("Home")

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

  signin(data:signin){
    if(data.email != "" && data.name != "" && data.password != ""){
      this.service.signin(data).subscribe((res)=>{
        let userdata = JSON.stringify(res)
        if(userdata && userdata.length>2){
          localStorage.setItem("user",`[${userdata}]`)
          this.router.navigate(["Home"])
          this.service.changeHeader.next("Home")
        }else{
          this.noMatch = true

          setTimeout(() => {
            this.noMatch = false
          }, 1500);
        
        }
      })
    }else{

      this.valid = true
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

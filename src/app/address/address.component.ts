import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { address } from '../../../datatype';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {

  service = inject(UserServiceService)
  router = inject(Router)
  
  address: address | any = []
  added = false
  ngOnInit(): void {
    this.getAddress()
  }

  getAddress() {
    let local = localStorage.getItem('user')
    let user = local && JSON.parse(local)
    this.service.getAddress(user[0].email).subscribe((res) => {
      if (res) {
        this.address = res[0]
      }
    })
  }


  save(data: address) {
    if (this.address.length == 0) {
      if (data.address != "" && data.city != "" && data.state != "" && data.zip) {
        let local = localStorage.getItem('user')
        let user = local && JSON.parse(local)
        data.email = user[0].email
        this.service.saveAddress(data).subscribe((res: address) => {
          if (res) {
            this.address = res
            this.added = true
            setTimeout(() => {
              this.added = false
            },1500)
          }
        })
      }
    } else {
      if (data.address != "" && data.city != "" && data.state != "" && data.zip) {
        data.id = this.address.id
        this.service.updateAddress(data).subscribe((res: any) => {
          if(res){
            this.address = res
            this.added = true
            setTimeout(() => {
              this.added = false
            },1500)
          }
        })
      }
    }
  }



  next(){
   this.router.navigate(['Payment']) 
  }
}
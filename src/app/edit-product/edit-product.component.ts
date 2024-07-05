import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { product } from '../../../datatype';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  
  activatedRouet = inject(ActivatedRoute)
  router = inject(Router)
  service = inject(SellerService)
  
  product:product|any=    {
    id: "",
    name: "Name",
    price: 0,
    image: "Image",
    color: "Color",
    email: "Email",
    category: "Category",
    description: "Description"
  }
  valid = false
  added = false
  ngOnInit(): void {
    this.getProduct()
  }
  getProduct(){
    let id = this.activatedRouet.snapshot.paramMap.get('id')
    if(id){
      this.service.getProduct(id).subscribe((res:product)=>{
        if(res){
          this.product.id = res.id
          this.product.name = res.name
          this.product.price = res.price
          this.product.image = res.image
          this.product.color = res.color
          this.product.email = res.email
          this.product.category = res.category
          this.product.description = res.description
        }
      })
    }
  }
  edit(data:product){
    if(data.category != "" && data.color != "" && data.description != "" && data.image != "" && data.name != "" && data.price != ""){
      data.id = this.product.id
      this.service.editProduct(data).subscribe((res)=>{
        if(res){
          this.added = true
          setTimeout(() => {
            this.added = false
            this.router.navigate(['Products'])
          }, 1500);
        }
      })
      
    }else{
      this.valid = true
      setTimeout(() => {
        this.valid = false
      }, 1500);
    }
  }
}

import { Component, inject } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { SellerService } from '../services/seller.service';
import { product } from '../../../datatype';
import { CurrencyPipe, NgFor, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule, NgFor, TitleCasePipe, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  sellerservice = inject(SellerService);
  router = inject(Router);

  sliderProducts: any | product = [];
  trendingProduct: any | product = [];

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.sellerservice.getAllProducts().subscribe((res: product | any) => {
      if (res) {
        this.trendingProduct = res;
        for (let i = 0; i < 3; i++) {
          const element = res[i];
          this.sliderProducts.push(element);
        }
      }
    });
  }

  viewProduct(id: string) {
    if (id.length) {
      this.router.navigate([`viewProduct/${id}`]);
    }
  }
}

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';
import { authGuard } from './auth.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductsComponent } from './products/products.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { AddressComponent } from './address/address.component';
import { PaymentComponent } from './payment/payment.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [


    {
        path: "",
        component: LoginComponent,

    },
    {
        path: "Home",
        component: HomeComponent,
        canActivate: [authGuard]
    },
    {
        path: "Seller",
        component: SellerComponent,
    },
    {
        path: "Products",
        component: ProductsComponent,
        canActivate: [authGuard]
    },
    {
        path: "addProduct",
        component: AddProductComponent,
        canActivate: [authGuard]
    },
    {
        path: "editProduct/:id",
        component: EditProductComponent,
        canActivate: [authGuard]

    },
    {
        path: "viewProduct/:id",
        component: ViewProductComponent,
        canActivate: [authGuard]

    },
    {
        path: "Cart",
        component: CartComponent,
        canActivate: [authGuard]

    },
    {
        path: "address",
        component: AddressComponent,
        canActivate: [authGuard]

    },
    {
        path: "Payment",
        component: PaymentComponent,
        canActivate: [authGuard]

    },
    {
        path: "Orders",
        component: OrdersComponent,
        canActivate: [authGuard]

    },
    {
        path: "Error",
        component: ErrorComponent,
        canActivate: [authGuard]

    },
];

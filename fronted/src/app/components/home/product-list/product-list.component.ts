import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ShopcartService } from 'src/app/services/shopcart.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any;
  wishList: any[] = [];
  constructor(
    private productService: ProductsService,
    private wishListService: WishlistService,
    public shopCart: ShopcartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadWishList();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (res) => {
        this.products = res;
      },
      (err) => {
        Swal.fire({
          title: 'Hola, lo sentimos!',
          text:
            'Parece que tuvimos un problema con los productos, comunicate con el administrador.',
          imageUrl: '../../../../../assets/imgs/stress.svg',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
          confirmButtonColor: '#6c5ce7',
        });
      }
    );
  }

  loadWishList() {
    if (this.shopCart.getToken()) {
      this.wishListService
        .getWishList(this.shopCart.getUserId())
        .subscribe((res) => {
          this.wishList = res;
        });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { WishlistService } from 'src/app/services/wishlist.service';
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
    private wishListService: WishlistService
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
        console.log(err);
      }
    );
  }

  loadWishList() {
    this.wishListService.getWishList().subscribe((res) => {
      this.wishList = res;
    });
  }
}

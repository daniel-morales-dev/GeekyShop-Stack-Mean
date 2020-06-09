import { Component, OnInit, Input } from '@angular/core';
import { ProductListComponent } from '../product-list.component';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/products';
import { MessengerService } from '../../../../services/messenger.service';
import { ShopcartService } from '../../../../services/shopcart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  //Corazon del html
  @Input() addedToWishList: boolean;
  constructor(
    private router: Router,
    private message: MessengerService,
    private cartService: ShopcartService,
    private wishList: WishlistService
  ) {}

  ngOnInit(): void {}
  selectedCard(id: String) {
    this.router.navigate(['/preview-products', id]);
  }

  handleAddToCart() {
    this.cartService.addProductToCar(this.product).subscribe(() => {
      this.message.sendMessage(this.product);
    });
  }

  handleAddToWishList() {
    this.wishList.addToWishList(this.product).subscribe(() => {
      this.addedToWishList = true;
    });
  }
  removeFromWishList() {
    this.wishList.removeFromWishList(this.product._id).subscribe(() => {
      this.addedToWishList = false;
    });
  }
}

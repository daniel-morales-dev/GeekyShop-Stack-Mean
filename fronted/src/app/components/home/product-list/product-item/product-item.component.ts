import { Component, OnInit, Input } from '@angular/core';
import { ProductListComponent } from '../product-list.component';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/products';
import { MessengerService } from '../../../../services/messenger.service';
import { ShopcartService } from '../../../../services/shopcart.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

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
    private wishList: WishlistService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}
  selectedCard(id: String) {
    this.router.navigate(['/preview-products', id]);
  }

  handleAddToCart() {
    const canAddtoCart = this.authService.loggedIn();
    if (canAddtoCart) {
      this.cartService
        .addProductToCar(this.product, this.cartService.getUserId())
        .subscribe(
          () => {
            this.message.sendMessage(this.product);
          },
          (err) => {
            if (err.error.code_error === 'product_exist') {
              Swal.fire({
                title: 'Ya tienes un producto similar en tu carrito',
                text: 'Disculpa las molestias',
                imageUrl: '../../../../../assets/imgs/welcome.svg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
                confirmButtonColor: '#6c5ce7',
              });
            }
          }
        );
    } else {
      Swal.fire({
        title: 'Hola, gracias por visitarnos!',
        text: 'Antes de añadir un producto, por favor inicia sesion.',
        imageUrl: '../../../../../assets/imgs/welcome.svg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        confirmButtonColor: '#6c5ce7',
      });
    }
  }

  handleAddToWishList() {
    this.wishList
      .addToWishList(this.product, this.cartService.getUserId())
      .subscribe(() => {
        this.addedToWishList = true;
      });
  }
  removeFromWishList() {
    this.wishList
      .removeFromWishList(this.cartService.getUserId(), this.product)
      .subscribe(() => {
        this.addedToWishList = false;
      });
  }
}

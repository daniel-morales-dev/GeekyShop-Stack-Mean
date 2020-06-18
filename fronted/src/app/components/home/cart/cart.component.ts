import { Component, OnInit } from '@angular/core';
import { MessengerService } from '../../../services/messenger.service';
import { Product } from 'src/app/models/products';
import Swal from 'sweetalert2';
import { ShopcartService } from 'src/app/services/shopcart.service';
import { CartItem } from 'src/app/models/cart-item';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems = [];
  cartUser: any;
  cartTotal = 0;
  constructor(
    private message: MessengerService,
    private cartService: ShopcartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.handleSubscription();
    this.loadCartItems();
    this.loadCartUser();
  }

  handleSubscription() {
    this.message.getMessage().subscribe((product: Product) => {
      this.loadCartItems();
    });
  }

  loadCartUser() {
    if (this.cartItems.length > 0) {
      this.cartService
        .getCartUser(this.cartService.getUserId())
        .subscribe((res) => {
          this.cartUser = res[0]._id;
          this.router.navigate(['/checkout', this.cartUser]);
        });
    }
  }
  cleanCart() {
    this.cartService.cleanCart(this.cartService.getUserId()).subscribe(
      (res) => {
        Swal.fire({
          title: 'Tu carrito se ha vaciado',
          imageUrl: '../../../../../assets/imgs/buy.svg',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
          confirmButtonColor: '#6c5ce7',
        }).then((result) => {
          if (result.value) {
            this.router
              .navigateByUrl('/RefreshComponent', {
                skipLocationChange: true,
              })
              .then(() => {
                this.router.navigate(['/home']);
              });
          }
        });
      },
      (err) => {
        Swal.fire({
          title: 'Hola, lo sentimos',
          text:
            'Hubo un error tratando de limpiar tu carrito, vuelve a intentar',
          imageUrl: '../../../../../assets/imgs/stress.svg',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
          confirmButtonColor: '#6c5ce7',
        });
      }
    );
  }

  loadCartItems() {
    this.cartService
      .getCartItems(this.cartService.getUserId())
      .subscribe((res) => {
        this.cartItems = res;
        this.calculeCartTotal();
      });
  }

  calculeCartTotal() {
    this.cartTotal = 0;
    this.cartItems.forEach((product) => {
      this.cartTotal += product.price;
    });
  }
}

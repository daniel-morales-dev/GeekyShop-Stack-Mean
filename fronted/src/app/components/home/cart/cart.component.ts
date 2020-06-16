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

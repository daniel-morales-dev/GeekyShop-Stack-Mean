import { Component, OnInit } from '@angular/core';
import { MessengerService } from '../../../services/messenger.service';
import { Product } from 'src/app/models/products';
import Swal from 'sweetalert2';
import { ShopcartService } from 'src/app/services/shopcart.service';
import { CartItem } from 'src/app/models/cart-item';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems = [];

  cartTotal = 0;
  constructor(
    private message: MessengerService,
    private cartService: ShopcartService
  ) {}

  ngOnInit() {
    this.handleSubscription();
    this.loadCartItems();
  }

  handleSubscription() {
    this.message.getMessage().subscribe((product: Product) => {
      this.loadCartItems();
    });
  }

  loadCartItems() {
    this.cartService
      .getCartItems(this.cartService.getUserId())
      .subscribe((items: CartItem[]) => {
        this.cartItems = items;
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

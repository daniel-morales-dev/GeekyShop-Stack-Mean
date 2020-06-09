import { Component, OnInit } from '@angular/core';
import { MessengerService } from '../../../services/messenger.service';
import { Product } from 'src/app/models/products';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems = [];

  cartTotal = 0;
  constructor(private message: MessengerService) {}

  ngOnInit() {
    this.message.getMessage().subscribe((product: Product) => {
      this.addProductToCar(product);
    });
  }

  addProductToCar(product: Product) {
    let productExits = false;
    for (let i in this.cartItems) {
      if (this.cartItems[i]._id === product._id) {
        Swal.fire({
          title: 'Ya tienes este producto en tu carrito',
          showClass: {
            popup: 'animate__headShake',
          },
          hideClass: {
            popup: 'animate__backOutUp',
          },
        });
        productExits = true;
        break;
      }
    }
    if (!productExits) {
      this.cartItems.push({
        _id: product._id,
        name: product.name,
        price: product.price,
      });
    }
    this.cartTotal = 0;
    this.cartItems.forEach((product) => {
      this.cartTotal += product.price;
    });
  }
}

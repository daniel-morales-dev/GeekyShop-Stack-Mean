import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShopcartService } from 'src/app/services/shopcart.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var paypal;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  idCart: String;
  cartTotal = 0;
  products: any;
  constructor(public shopCart: ShopcartService) {}

  ngOnInit(): void {
    this.loadProductsInCart();
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: `Pago`,
                amount: {
                  currency_code: 'USD',
                  value: this.cartTotal,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          Swal.fire({
            title: 'Hola, agradecemos por tu compra',
            text: 'Se te hara entrega de tu producto a tu correo registrado',
            imageUrl: '../../../../../assets/imgs/buy.svg',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
            confirmButtonColor: '#6c5ce7',
          });
        },
        onError: (err) => {
          Swal.fire({
            title: 'Hola, lo sentimos',
            text:
              'Hubo un error con tu metodo de pago, comunicate con tu banco o intenta de nuevo',
            imageUrl: '../../../../../assets/imgs/stress.svg',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
            confirmButtonColor: '#6c5ce7',
          });
        },
      })
      .render(this.paypalElement.nativeElement);
  }

  loadProductsInCart() {
    this.shopCart.getCartItems(this.shopCart.getUserId()).subscribe(
      (res) => {
        this.products = res;
        this.calculeCartTotal();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  calculeCartTotal() {
    this.cartTotal = 0;
    this.products.forEach((product) => {
      this.cartTotal += product.price;
    });
  }
}

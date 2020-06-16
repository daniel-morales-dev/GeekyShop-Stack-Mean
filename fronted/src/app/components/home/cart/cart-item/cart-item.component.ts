import { Component, OnInit, Input } from '@angular/core';
import { ShopcartService } from 'src/app/services/shopcart.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  mySubscription: any;
  @Input() cartItem: any;
  constructor(public shopCart: ShopcartService, private router: Router) {}

  ngOnInit(): void {}
  deleteProductOfCart(product) {
    this.shopCart
      .deleteProductFromCar(product, this.shopCart.getUserId())
      .subscribe(
        (res) => {
          Swal.fire({
            title: 'El producto se ha eliminado de tu carrito',
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
              'Hubo un error tratando de eliminar el producto, vuelve a intentar',
            imageUrl: '../../../../../assets/imgs/stress.svg',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
            confirmButtonColor: '#6c5ce7',
          });
        }
      );
  }
}

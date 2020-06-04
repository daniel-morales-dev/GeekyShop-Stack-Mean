import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from '../../services/products.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any;
  constructor(
    private authService: AuthService,
    private productService: ProductsService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (res) => {
        console.log(res);
        this.products = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

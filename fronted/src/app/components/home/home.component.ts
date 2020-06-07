import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any;
  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (res) => {
        this.products = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  selectedCard(id: String) {
    this.router.navigate(['/preview-products', id]);
  }
}

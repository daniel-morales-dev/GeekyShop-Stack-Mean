import { Component, OnInit, Input } from '@angular/core';
import { ProductListComponent } from '../product-list.component';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/products';
import { MessengerService } from '../../../../services/messenger.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  constructor(private router: Router, private message: MessengerService) {}

  ngOnInit(): void {}
  selectedCard(id: String) {
    this.router.navigate(['/preview-products', id]);
  }

  handleAddToCart() {
    this.message.sendMessage(this.product);
  }
}

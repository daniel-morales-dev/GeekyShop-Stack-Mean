import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';
interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-gestion-products',
  templateUrl: './gestion-products.component.html',
  styleUrls: ['./gestion-products.component.css'],
  providers: [ProductsService],
})
export class GestionProductsComponent implements OnInit {
  product = { name: '', description: '', price: 0 };
  file: File;
  pricePatterns = '/^([0-9])*$/';
  photoSelected: string | ArrayBuffer;
  constructor(private router: Router, public productService: ProductsService) {}

  ngOnInit(): void {}
  resetForm(form?: NgForm) {
    if (form) {
      form.resetForm();
    }
  }
  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files) {
      this.file = <File>event.target.files[0];
      //Image Preview
      const reader = new FileReader();
      reader.onload = (e) => (this.photoSelected = reader.result);
      reader.readAsDataURL(this.file);
    }
  }
  createProduct(form: NgForm) {
    this.productService.createProduct(this.product, this.file).subscribe(
      (res) => {
        this.resetForm();
        Swal.fire({
          title: 'Registro exitoso!',
          text: 'Juego agregado correctamente',
          icon: 'success',
          confirmButtonColor: '#6c5ce7',
        });
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Algo salio mal',
          text: 'No pudimos agregar el juego',
          confirmButtonColor: '#6c5ce7',
        });
      }
    );
  }
}

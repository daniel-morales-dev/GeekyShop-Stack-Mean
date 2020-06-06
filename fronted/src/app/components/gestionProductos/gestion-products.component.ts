import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  createProductForm: FormGroup;
  photoSelected: string | ArrayBuffer;
  pricePattern = /[0-9]/;

  constructor(
    private router: Router,
    public productService: ProductsService,
    public fb: FormBuilder
  ) {
    this.createProductForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(140)]],
      price: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(7),
          Validators.pattern(this.pricePattern),
        ],
      ],
      inputImage: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}
  resetForm(form?: FormGroup) {
    if (form) {
      form.reset();
    }
  }
  //VALIDA SI LO QUE ESTOY INGRESANDO SON NUMEROS O LETRAS
  onPriceIntroduced(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.charCode);
    if (!this.pricePattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
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

  createProduct() {
    this.productService
      .createProduct(this.createProductForm.value, this.file)
      .subscribe(
        (res) => {
          this.resetForm(this.createProductForm);
          Swal.fire({
            title: 'Registro exitoso!',
            text: 'Juego agregado correctamente',
            icon: 'success',
            confirmButtonColor: '#6c5ce7',
          });
          this.router.navigate(['/home']);
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

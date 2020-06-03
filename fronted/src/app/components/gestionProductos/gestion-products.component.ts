import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-gestion-products',
  templateUrl: './gestion-products.component.html',
  styleUrls: ['./gestion-products.component.css'],
})
export class GestionProductsComponent implements OnInit {
  uploadedFiles: Array<File>;
  constructor(private router: Router) {}

  ngOnInit(): void {}
  onUpload() {
    let formData = new FormData();
    for (let i = 0; i < this.uploadedFiles.length; i++) {
      formData.append(
        'image[]',
        this.uploadedFiles[i],
        this.uploadedFiles[i].name
      );
    }
    //Servicio
  }
  onChange(e) {
    this.uploadedFiles = e.target.files;
  }
}

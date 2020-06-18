import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  datoFilter = '';
  constructor() {}

  tomarDatos(dato) {
    this.datoFilter = dato;
    return dato;
  }
  entregarDato() {
    return this.datoFilter;
  }
}

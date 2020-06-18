import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FilterService } from 'src/app/services/filter.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public filterService: FilterService
  ) {}
  filtroValor = '';
  ngOnInit() {
    this.cargarDatoEnFiltro();
  }
  handleSearch(value: string) {
    const datos = this.filterService.entregarDato();
    if (datos != '' || !datos) {
      this.filtroValor = datos;
    }
    this.filtroValor = value;
  }

  recibirDatoFiltro() {
    const datos = this.filterService.entregarDato();
    return datos;
  }

  cargarDatoEnFiltro() {
    const datoFiltrar = this.recibirDatoFiltro();
    if (datoFiltrar != '' || !datoFiltrar) {
      this.filtroValor = datoFiltrar;
    }
  }
}

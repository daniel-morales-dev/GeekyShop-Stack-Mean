import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { FilterService } from './services/filter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public static updateUserStatus: Subject<boolean> = new Subject();
  user: any;
  constructor(
    public authService: AuthService,
    public filterService: FilterService,
    private router: Router
  ) {
    AppComponent.updateUserStatus.subscribe((res) => {
      this.traerDatos();
    });
  }
  filtroValor = '';
  ngOnInit() {
    this.traerDatos();
    this.filter.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.filtroValor = value;
      this.filterEmitter.emit(value);
      this.filterService.tomarDatos(this.filtroValor);
      this.router
        .navigateByUrl('/RefreshComponent', {
          skipLocationChange: true,
        })
        .then(() => {
          this.router.navigate(['/home']);
        });
    });
  }

  selectCart(id: String) {
    this.router.navigate(['/checkout', id]);
  }

  traerDatos() {
    //CREO UNA FUNCION QUE ME VA GUARDAR LOS DATOS DEL USUARIO DECODIFICANDO EL TOKEN
    if (this.authService.loggedIn()) {
      //SOLO DECODIFICA EL TOKEN SI ESTA LOGEADO
      this.user = {
        id: this.authService.decodeToken().id,
        email: this.authService.decodeToken().email,
        nombre_usuario: this.authService.decodeToken().nombre_usuario,
        rol: this.authService.decodeToken().rol,
      };
    }
  }
  filter = new FormControl('');

  @Output('filter') filterEmitter = new EventEmitter<String>();
}

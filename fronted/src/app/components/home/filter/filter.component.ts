import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  constructor(public filterService: FilterService) {}
  valorFilter = '';
  ngOnInit(): void {
    this.traerDatoFilter();
    this.filter.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.valorFilter = value;
      this.filterEmitter.emit(value);
    });
  }
  traerDatoFilter() {
    const datoFilter = this.filterService.entregarDato();
    if (datoFilter != '' || !datoFilter) {
      this.valorFilter = datoFilter;
      this.filter.setValue(datoFilter);
    }
  }
  filter = new FormControl('');

  @Output('filter') filterEmitter = new EventEmitter<String>();
}

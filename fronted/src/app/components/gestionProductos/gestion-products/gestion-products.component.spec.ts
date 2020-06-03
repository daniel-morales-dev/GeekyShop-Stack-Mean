import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProductsComponent } from './gestion-products.component';

describe('GestionProductsComponent', () => {
  let component: GestionProductsComponent;
  let fixture: ComponentFixture<GestionProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

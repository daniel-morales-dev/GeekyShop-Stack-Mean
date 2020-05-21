import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateGamesComponent } from './private-games.component';

describe('PrivateGamesComponent', () => {
  let component: PrivateGamesComponent;
  let fixture: ComponentFixture<PrivateGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

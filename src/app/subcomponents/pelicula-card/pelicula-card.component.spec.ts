import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaCardComponent } from './pelicula-card.component';

describe('PeliculaCardComponent', () => {
  let component: PeliculaCardComponent;
  let fixture: ComponentFixture<PeliculaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeliculaCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeliculaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

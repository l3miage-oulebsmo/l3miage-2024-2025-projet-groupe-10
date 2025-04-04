import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTourneeComponent } from './gestion-tournee.component';

describe('GestionTourneeComponent', () => {
  let component: GestionTourneeComponent;
  let fixture: ComponentFixture<GestionTourneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionTourneeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionTourneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

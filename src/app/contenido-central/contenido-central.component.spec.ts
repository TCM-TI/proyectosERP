import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoCentralComponent } from './contenido-central.component';

describe('ContenidoCentralComponent', () => {
  let component: ContenidoCentralComponent;
  let fixture: ComponentFixture<ContenidoCentralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenidoCentralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenidoCentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

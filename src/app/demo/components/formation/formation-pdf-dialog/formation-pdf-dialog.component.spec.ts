import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationPdfDialogComponent } from './formation-pdf-dialog.component';

describe('FormationPdfDialogComponent', () => {
  let component: FormationPdfDialogComponent;
  let fixture: ComponentFixture<FormationPdfDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormationPdfDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormationPdfDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

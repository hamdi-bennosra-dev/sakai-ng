import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationDialogComponent } from './formation-dialog.component';

describe('FormationDialogComponent', () => {
  let component: FormationDialogComponent;
  let fixture: ComponentFixture<FormationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

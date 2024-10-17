import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationItemComponent } from './formation-item.component';

describe('FormationItemComponent', () => {
  let component: FormationItemComponent;
  let fixture: ComponentFixture<FormationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormationItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

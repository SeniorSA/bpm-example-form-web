import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCrudComponent } from './table-crud.component';

describe('TableCrudComponent', () => {
  let component: TableCrudComponent;
  let fixture: ComponentFixture<TableCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

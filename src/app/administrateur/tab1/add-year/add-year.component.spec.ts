import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddYearComponent } from './add-year.component';

describe('AddYearComponent', () => {
  let component: AddYearComponent;
  let fixture: ComponentFixture<AddYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddYearComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

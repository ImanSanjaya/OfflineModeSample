import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormScanPage } from './form-scan.page';

describe('FormScanPage', () => {
  let component: FormScanPage;
  let fixture: ComponentFixture<FormScanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormScanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormScanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

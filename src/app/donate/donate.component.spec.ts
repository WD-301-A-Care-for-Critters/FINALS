import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DonateComponent } from './donate.component';

describe('DonateComponent', () => {
  let component: DonateComponent;
  let fixture: ComponentFixture<DonateComponent>;

  it('should create the app', () => {
    const fixture = TestBed.createComponent(DonateComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'donateapp'`, () => {
    const fixture = TestBed.createComponent(DonateComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('donateapp');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(DonateComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('donateapp app is running!');
  });




  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonateComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit donation form', () => {
    const compiled = fixture.nativeElement;
    spyOn(console, 'log'); // Spy on console.log to check if it's called when form is submitted

    // Simulate filling out the form
    const nameInput = compiled.querySelector('input[name="name"]');
    nameInput.value = 'John Doe';
    nameInput.dispatchEvent(new Event('input'));

    const emailInput = compiled.querySelector('input[name="email"]');
    emailInput.value = 'john@example.com';
    emailInput.dispatchEvent(new Event('input'));

    const amountInput = compiled.querySelector('input[name="amount"]');
    amountInput.value = '50';
    amountInput.dispatchEvent(new Event('input'));

    // Submit the form
    const form = compiled.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    // Check if console.log is called with the correct data
    expect(console.log).toHaveBeenCalledWith('Donation submitted:', {
      name: 'John Doe',
      email: 'john@example.com',
      amount: 50
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { EntityService } from '../abstract-entity.page';
import { Payment } from '../common/interfaces';
import { mockPayments } from '../common/mocks';
import { PaymentPageComponent } from './payment-page.component';
import createSpy = jasmine.createSpy;

describe('PaymentPageComponent', () => {
   let component: PaymentPageComponent;
   let fixture: ComponentFixture<PaymentPageComponent>;

   class MockActivatedRoute {
      snapshot = {
         paramMap: new Map<string, string>().set('id', 'tes-id')
      };
   }
   class MockPaymentPageService extends EntityService<Payment> {
      loading$ = of(false);
      data$ = of(mockPayments[0]);
      getData = createSpy('getData');
      setData = createSpy('setData');
   }

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [PaymentPageComponent, NoopAnimationsModule],
         providers: [
            { provide: ActivatedRoute, useClass: MockActivatedRoute },
            { provide: EntityService, useClass: MockPaymentPageService }
         ]
      }).overrideComponent(PaymentPageComponent, {
         set: {
            providers: [
               { provide: EntityService, useClass: MockPaymentPageService }
            ]
         }
      });

      fixture = TestBed.createComponent(PaymentPageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});

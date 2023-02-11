import { Injectable } from '@angular/core';
import { BehaviorSubject, take, finalize } from 'rxjs';
import { EntityService } from '../abstract-entity.page';
import { DbService } from '../services/db.service';
import { EntityType } from '../common/enums';
import { Payment } from 'src/common/interfaces';

@Injectable()
export class PaymentPageService implements EntityService<Payment> {
   private loadingSource = new BehaviorSubject<boolean>(false);
   loading$ = this.loadingSource.pipe();
   private dataSource = new BehaviorSubject<Payment | null>(null);
   data$ = this.dataSource.pipe();
   constructor(private dbService: DbService) {
   }

   setData(payment: Payment): void {
      this.dataSource.next(payment);
   }

   getData(id: string): void {
      this.loadingSource.next(true);
      this.dbService.getEntity(EntityType.Payments, id).pipe(
         take(1),
         finalize(() => this.loadingSource.next(false))
      ).subscribe((user) => {
         this.dataSource.next(user as Payment);
      });
   }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, take, finalize } from 'rxjs';
import { EntityService } from '../abstract-entity.page';
import { DbService } from '../services/db.service';
import { EntityType } from '../common/enums';
import { Country } from 'src/common/interfaces';

@Injectable()
export class CountryPageService implements EntityService<Country> {
   private loadingSource = new BehaviorSubject<boolean>(false);
   loading$ = this.loadingSource.pipe();
   private dataSource = new BehaviorSubject<Country | null>(null);
   data$ = this.dataSource.pipe();
   constructor(private dbService: DbService) {
   }

   setData(country: Country): void {
      this.dataSource.next(country);
   }

   getData(id: string): void {
      this.loadingSource.next(true);
      this.dbService.getEntity(EntityType.Countries, id).pipe(
         take(1),
         finalize(() => this.loadingSource.next(false))
      ).subscribe((user) => {
         this.dataSource.next(user as Country);
      });
   }
}

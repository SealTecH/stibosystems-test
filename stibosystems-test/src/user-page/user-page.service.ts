import { Injectable } from '@angular/core';
import { BehaviorSubject, take, finalize } from 'rxjs';
import { EntityService } from '../abstract-entity.page';
import { DbService } from '../services/db.service';
import { EntityType } from '../common/enums';
import { User } from 'src/common/interfaces';

@Injectable()
export class UserPageService implements EntityService<User> {
   private loadingSource = new BehaviorSubject<boolean>(false);
   loading$ = this.loadingSource.pipe();
   private dataSource = new BehaviorSubject<User | null>(null);
   data$ = this.dataSource.pipe();
   constructor(private dbService: DbService) {
   }

   setData(user: User): void {
      this.dataSource.next(user);
   }

   getData(id: string): void {
      this.loadingSource.next(true);
      this.dbService.getEntity(EntityType.Users, id).pipe(
         take(1),
         finalize(() => this.loadingSource.next(false))
      ).subscribe((user) => {
         this.dataSource.next(user as User);
      });
   }
}

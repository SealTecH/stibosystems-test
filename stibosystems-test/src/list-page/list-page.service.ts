import { Injectable } from '@angular/core';
import {
   BehaviorSubject, finalize, Observable, map, take, catchError, of
} from 'rxjs';
import { DbService } from '../services/db.service';
import { EntityType } from '../common/enums';
import { EntityItem, ConcreteEntity } from '../common/interfaces';

@Injectable({
   providedIn: 'root'
})
export class ListPageService {
   private loadingSource = new BehaviorSubject<boolean>(false);
   loading$ = this.loadingSource.pipe();

   private dataSource = new BehaviorSubject<Map<EntityType, EntityItem[]>>(new Map());

   constructor(private dbService: DbService) {
   }

   getDataByEntity(key: EntityType): Observable<ConcreteEntity<typeof key>[]> {
      return this.dataSource.pipe(map(listsMap => listsMap.get(key) || []));
   }

   intEntitiesList(entityType: EntityType): void {
      const data = this.dataSource.value.get(entityType);

      if (!data || !this.dataSource.value.get(entityType)!.length) {
         this.getData(entityType);
      }
   }

   private getData(entityType: EntityType): void {
      this.loadingSource.next(true);

      this.dbService.getData(entityType).pipe(
         take(1),
         catchError((err) => {
            console.warn(err);

            return of([]);
         }),
         finalize(() => this.loadingSource.next(false))
      ).subscribe(res => this.dataSource.next(this.dataSource.value.set(entityType, res)));
   }
}

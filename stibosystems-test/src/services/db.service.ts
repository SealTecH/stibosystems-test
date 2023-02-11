import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { omit, capitalize } from 'lodash-es';
import { EntityType } from '../common/enums';
import { EntityItem, EntityResponse, Country, Payment, User } from '../common/interfaces';

@Injectable({
   providedIn: 'root'
})
export class DbService {
   constructor(private http: HttpClient) {

   }

   getData(entityType: EntityType): Observable<EntityItem[]> {
      return this.http.get<EntityResponse[]>(`/${entityType}`).pipe(map(res => res.map(row => this.normalizeData(entityType, row))));
   }

   getEntity(entityType: EntityType, id: string): Observable<EntityItem> {
      return this.http.get<EntityResponse>(`/${entityType}/${id}`).pipe(map(res => this.normalizeData(entityType, res)));
   }

   private normalizeData(entityType: EntityType, data: EntityResponse): EntityItem {
      switch (entityType) {
      case EntityType.Countries:
         return { ...omit(data, ['someWeirdServerFieldNameWithCount']) } as Country;
      case EntityType.Payments:
         return {
            ...omit(data, ['internalFieldA', 'xYZRandomField']),
            status: (data as Payment).status.split('_').map(part => capitalize(part)).join(' ')
         } as Payment;
      case EntityType.Users:
      default:
         return data as User;
      }
   }
}

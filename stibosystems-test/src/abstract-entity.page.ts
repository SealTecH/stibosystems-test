import { ActivatedRoute } from '@angular/router';
import { OnInit, Directive } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityItem } from './common/interfaces';

export abstract class EntityService<T> {
  abstract loading$: Observable<boolean>;
  abstract data$: Observable<T | null>;
  abstract getData: (id: string) => void
  abstract setData: (entity: T) => void
}
@Directive()
export abstract class AbstractEntityPage<T extends EntityItem> implements OnInit {
   loading$ = this.service.loading$;
   data$: Observable<T | null> = this.service.data$;
   constructor(private route: ActivatedRoute, private service: EntityService<T>) {

   }

   ngOnInit(): void {
      // eslint-disable-next-line no-restricted-globals
      if (history.state?.entity) {
         // eslint-disable-next-line no-restricted-globals
         this.service.setData(history.state.entity);
      } else {
         this.service.getData(this.route.snapshot.paramMap.get('id')!);
      }
   }
}

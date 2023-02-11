import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
   combineLatest, startWith, map, shareReplay, Observable
} from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { capitalize } from 'lodash-es';
import { MatTableDataSource } from '@angular/material/table';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { EntityType } from '../common/enums';
import { EntityItem, ConcreteEntity } from '../common/interfaces';
import { ListPageService } from './list-page.service';

const SEARCH_FIELDS_BY_ENTITY: { [T in EntityType]: (keyof ConcreteEntity<T>)[]} = {
   [EntityType.Users]: ['firstName', 'lastName', 'email'],
   [EntityType.Countries]: ['name'],
   [EntityType.Payments]: ['status']
};

@Component({
   selector: 'app-list-page',
   standalone: true,
   imports: [
      CommonModule,
      MatButtonModule,
      MatProgressSpinnerModule,
      MatFormFieldModule,
      MatCheckboxModule,
      MatCardModule,
      ReactiveFormsModule,
      MatInputModule,
      ScrollingModule
   ],
   templateUrl: './list-page.component.html',
   styleUrls: ['./list-page.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPageComponent implements OnInit {
   readonly entityTypes = EntityType;
   // @ts-ignore:next-line:dot-notation
   entityType: EntityType = this.route.snapshot.data.entityType;
   searchControl = new FormControl<string>('');
   loading$ = this.service.loading$;
   selectedItemsList: EntityItem[] = [];
   dataSource = new MatTableDataSource<any>();
   filteredList$: Observable<EntityItem[]> = combineLatest([
      this.service.getDataByEntity(this.entityType),
      this.searchControl.valueChanges.pipe(startWith(''))
   ]).pipe(
      map(([entities, searchString]) => (searchString ? this.filterList(this.entityType, entities, searchString!.toLowerCase())
         : entities)),
      shareReplay(1)
   );

   constructor(private route: ActivatedRoute, private service: ListPageService, private router: Router) {
   }

   get pageTitle(): string {
      return capitalize(this.entityType.toString());
   }

   ngOnInit(): void {
      this.service.intEntitiesList(this.entityType);
   }

   goBack(): void {
      this.router.navigate(['../']);
   }

   clearSearch(): void {
      this.searchControl.setValue('');
   }

   checkSelectedItem(itemToCheck: EntityItem): boolean {
      return this.selectedItemsList.some(item => item === itemToCheck);
   }

   changeItemSelection(itemToSelect: EntityItem): void {
      const index = this.selectedItemsList.findIndex(item => item === itemToSelect);

      if (index > -1) {
         this.selectedItemsList.splice(index, 1);
      } else {
         this.selectedItemsList.push(itemToSelect);
      }
   }

   navigateToEntity(item: EntityItem): void {
      this.router.navigate([this.entityType, item.id], { state: { entity: item } });
   }

   private filterList(entityType: EntityType,
      entities: ConcreteEntity<typeof entityType>[],
      searchString: string): ConcreteEntity<typeof entityType>[] {
      return entities.filter(entity => SEARCH_FIELDS_BY_ENTITY[this.entityType]
         .some(key => (entity[key as keyof ConcreteEntity<typeof entityType>] as string).toLowerCase().includes(searchString)));
   }
}

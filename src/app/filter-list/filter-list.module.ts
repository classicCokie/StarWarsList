import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterListRoutingModule } from './filter-list-routing.module';
import { ListViewComponent } from './components/list-view/list-view.component';

@NgModule({
  declarations: [ListViewComponent],
  imports: [
    CommonModule,
    FilterListRoutingModule
  ]
})
export class FilterListModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FilterListRoutingModule } from './filter-list-routing.module';
import { ListViewComponent } from './components/list-view/list-view.component';

@NgModule({
  declarations: [ListViewComponent],
  exports: [ListViewComponent],
  imports: [
    CommonModule,
    FilterListRoutingModule,
    HttpClientModule,
  ]
})
export class FilterListModule { }

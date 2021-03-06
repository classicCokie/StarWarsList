import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FilterListRoutingModule } from './filter-list-routing.module';
import { ListViewComponent } from './components/list-view/list-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailViewComponent } from './components/detail-view/detail-view.component';

@NgModule({
  declarations: [ListViewComponent, DetailViewComponent],
  exports: [ListViewComponent],
  imports: [
    CommonModule,
    FilterListRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class FilterListModule { }

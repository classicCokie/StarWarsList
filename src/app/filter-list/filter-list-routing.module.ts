import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListViewComponent } from './components/list-view/list-view.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ListViewComponent },
  { path: 'characters/:id', component: DetailViewComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class FilterListRoutingModule { }

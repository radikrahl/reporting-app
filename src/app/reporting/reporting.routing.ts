import {NgModule} from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ReportingComponent } from './reporting.component';

const routes: Routes = [
  { path: 'report', component: ReportingComponent },

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    declarations: [],
})
export class ReportingRoutingModule {

}

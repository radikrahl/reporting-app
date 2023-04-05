import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { ReportingComponent } from "./pages/report/reporting.component";
import { MyReportsComponent } from "./pages/my-reports/my-reports.component";

const routes: Routes = [
  { path: "report", component: ReportingComponent },
  {
    path: "myreports",
    children: [
      {
        path: "",
        component: MyReportsComponent
      },
      {
        path: "folder",
        component: MyReportsComponent,
        data: { noReuse: true },

      }
    ]
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  declarations: [],
})
export class ReportingRoutingModule {}

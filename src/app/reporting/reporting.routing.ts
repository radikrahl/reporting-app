import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { MyReportsComponent } from "./pages/my-reports/my-reports.component";
import { ReportingComponent } from "./pages/reporting.component";
import { NewReportComponent } from "./pages/report/new-report.component";
import {
  ChickenReportFactory,
  GoatReportFormFactory,
  MonthlyFormFactory,
} from "./classes/reportform.factory";
import { REPORT_FACTORY } from "../shared/forms/classes/report-form";

const routes: Routes = [
  { path: "", component: ReportingComponent },
  {
    path: "myreports",
    children: [
      {
        path: "",
        component: MyReportsComponent,
        data: { noReuse: true },
      },
    ],
  },
  {
    path: "report",
    children: [
      {
        path: "chicken",
        component: NewReportComponent,
        providers: [
          { provide: REPORT_FACTORY, useClass: ChickenReportFactory },
        ],
      },
      {
        path: "goat",
        component: NewReportComponent,
        providers: [
          { provide: REPORT_FACTORY, useClass: GoatReportFormFactory },
        ],
      },
      {
        path: "monthly",
        component: NewReportComponent,
        providers: [{ provide: REPORT_FACTORY, useClass: MonthlyFormFactory }],
      },
    ],
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  declarations: [],
})
export class ReportingRoutingModule {}

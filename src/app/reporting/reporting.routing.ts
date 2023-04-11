import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { MyReportsComponent } from "./pages/my-reports/my-reports.component";
import { ReportingComponent } from "./pages/reporting.component";
import { NewReportComponent } from "./pages/report/new-report.component";
import { ReportFormFactory } from "./classes/reportform.factory";

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
          { provide: "REPORT_FORM", useValue: new ReportFormFactory().createForm() },
        ],
      },
      {
        path: "goat",
        component: NewReportComponent,
        providers: [
          { provide: "REPORT_FORM", useValue: new ReportFormFactory().createGoatForm() },
        ],
      },
      {
        path: "monthly",
        component: NewReportComponent,
        providers: [
          { provide: "REPORT_FORM", useValue: new ReportFormFactory().createMonthlyForm() },
        ]
      },
    ],
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  declarations: [],
})
export class ReportingRoutingModule {}

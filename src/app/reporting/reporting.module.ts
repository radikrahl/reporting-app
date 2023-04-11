import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptNgZone } from "@nativescript/angular";
import { SharedModule } from "../shared/shared.module";
import { ReportingRoutingModule } from "./reporting.routing";
import { MyReportsComponent } from "./pages/my-reports/my-reports.component";
import { FilesModule } from "../shared/files/files.module";
import { ReportingComponent } from "./pages/reporting.component";
import { NewReportComponent } from "./pages/report/new-report.component";

@NgModule({
  imports: [SharedModule, ReportingRoutingModule, FilesModule],
  providers: [NativeScriptNgZone],
  declarations: [ReportingComponent, NewReportComponent, MyReportsComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ReportingModule {}

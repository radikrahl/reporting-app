import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptNgZone } from "@nativescript/angular";
import { SharedModule } from "../shared/shared.module";
import { ReportingRoutingModule } from "./reporting.routing";
import { ReportingComponent } from "./pages/report/reporting.component";
import { MyReportsComponent } from "./pages/my-reports/my-reports.component";
import { FilesModule } from "../shared/files/files.module";

@NgModule({
  imports: [SharedModule, ReportingRoutingModule, FilesModule],
  providers: [NativeScriptNgZone],
  declarations: [ReportingComponent, MyReportsComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ReportingModule {}

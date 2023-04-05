import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptNgZone } from "@nativescript/angular";
import { SharedModule } from "../shared/shared.module";
import { ReportingComponent } from "./pages/reporting.component";
import { ReportingRoutingModule } from "./reporting.routing";
import { FileManager } from "../core/services/files/file.manager";

@NgModule({
  imports: [SharedModule, ReportingRoutingModule],
  providers: [NativeScriptNgZone],
  declarations: [ReportingComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ReportingModule {}

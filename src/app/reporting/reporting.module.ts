import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptNgZone } from "@nativescript/angular";
import { SharedModule } from "../shared/shared.module";
import { ReportingComponent } from "./pages/reporting.component";
import { ReportingRoutingModule } from "./reporting.routing";

@NgModule({
  imports: [SharedModule, ReportingRoutingModule],
  providers: [NativeScriptNgZone],
  declarations: [ReportingComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ReportingModule {}

import { CommonModule } from "@angular/common";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";
import { ReportFormsModule } from "../forms/forms.module";
import { ReportPageComponent } from "./pages/report-page/report-page.component";
import { ReportingComponent } from "./pages/reporting.component";
import { ReportingRoutingModule } from "./reporting.routing";

@NgModule({
  imports: [
    CommonModule,
    NativeScriptModule,
    ReportFormsModule,
    ReportingRoutingModule,
  ],
  declarations: [ReportingComponent, ReportPageComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ReportingModule {}

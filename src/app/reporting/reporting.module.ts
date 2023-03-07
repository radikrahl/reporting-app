import { CommonModule } from "@angular/common";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NativeScriptFormsModule } from "@nativescript/angular";
import { ReportFormItemComponent } from "./component/form-item/form-item.component";
import { ReportFormComponent } from "./component/form/form.component";
import { ReportingComponent } from "./pages/reporting.component";
import { ReportingRoutingModule } from "./reporting.routing";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NativeScriptFormsModule,
    ReportingRoutingModule,
  ],
  declarations: [
    ReportingComponent,
    ReportFormComponent,
    ReportFormItemComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ReportingModule {}

import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NativeScriptCommonModule, NativeScriptFormsModule } from "@nativescript/angular";
import { NativeScriptDateTimePickerModule } from "@nativescript/datetimepicker/angular";
import { ReportFormItemComponent } from "./components/form-item/form-item.component";
import { ReportFormComponent } from "./components/form/form.component";

@NgModule({
  imports: [
    NativeScriptCommonModule,
    FormsModule,
    ReactiveFormsModule,
    NativeScriptFormsModule,
    NativeScriptDateTimePickerModule,
  ],
  declarations: [ReportFormComponent, ReportFormItemComponent],
  exports: [ReportFormComponent, ReportFormItemComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ReportFormsModule {}

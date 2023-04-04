import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
} from "@nativescript/angular";
import { NativeScriptDateTimePickerModule } from "@nativescript/datetimepicker/angular";
import { DatepickerComponent } from "./components/datepicker/datepicker.component";
import { ReportFormComponent } from "./components/form/form.component";
import { SwitchComponent } from "./components/switch/switch.component";
import { TextboxComponent } from "./components/textbox/textbox.component";
import { TextViewComponent } from "./components/textview/textview.component";
import { FormItemDirective } from "./directives/form-item.directive";

@NgModule({
  imports: [
    NativeScriptCommonModule,
    FormsModule,
    ReactiveFormsModule,
    NativeScriptFormsModule,
    NativeScriptDateTimePickerModule,
  ],
  declarations: [
    ReportFormComponent,
    FormItemDirective,
    TextboxComponent,
    SwitchComponent,
    TextViewComponent,
    DatepickerComponent,
  ],
  exports: [ReportFormComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ReportFormsModule {}
